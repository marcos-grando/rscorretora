// Reproduz os joins de leitura e a prioridade de related_smart, sem banco ou rede.
export function createPropertyCatalog({ items, construtoras, types, status, slide }) {
    const index = (rows, name) => {
        if (!Array.isArray(rows)) throw new Error(name + " precisa conter um array.");
        const map = new Map();
        for (const row of rows) {
            if (!row || !Number.isSafeInteger(row.id) || row.id < 1 || map.has(row.id))
                throw new Error("ID inválido ou repetido em " + name + ".");
            map.set(row.id, row);
        }
        return map;
    };
    const itemsById = index(items, "items");
    const buildersById = index(construtoras, "construtoras");
    const typesById = index(types, "types");
    const statusById = index(status, "status");
    index(slide, "slide");
    const reference = (map, id, name, nullable = false) => {
        if (id == null && nullable) return null;
        const row = map.get(id);
        if (!row) throw new Error("Referência inexistente em " + name + ": " + id);
        return row;
    };
    const joinedItems = new Map();
    const allItems = items.map(item => {
        const type = reference(typesById, item.type_id, "items.type_id");
        const state = reference(statusById, item.status_id, "items.status_id", true);
        const builder = reference(buildersById, item.construtora_id, "items.construtora_id", true);
        joinedItems.set(item.id, {
            ...item,
            const_logo: builder ? { logo: builder.logo ?? null } : null,
            type_name: { single: type.single ?? null },
            status_name: state ? { name: state.name ?? null } : null,
        });
        return {
            id: item.id, type_id: item.type_id, name: item.name, tipo: type.single ?? null,
            local: item.bairro == null || item.cidade == null ? null : item.bairro + ", " + item.cidade,
            valor: item.valor, thumb: item.thumb?.url ?? null, details: item.extradb?.details ?? null,
            status: state?.name ?? null, status_id: item.status_id,
        };
    });
    const slides = [...slide].sort((a, b) => a.position - b.position || a.id - b.id).map(row => {
        const item = reference(itemsById, row.item_id, "slide.item_id");
        const state = reference(statusById, item.status_id, "items.status_id", true);
        return {
            id: row.id, item_id: row.item_id, detalhes: row.detalhes, position: row.position,
            banner: row.banner?.url ?? null, item_name: item.name, item_valor: item.valor,
            item_local: item.local, status_name: state?.name ?? null,
        };
    });

    const sqlEqual = (a, b) => a != null && b != null && a === b;
    function getRelatedItems(itemId, limit = 10, random = Math.random) {
        const source = itemsById.get(itemId);
        if (!source || !Number.isSafeInteger(limit) || limit < 1) return [];
        const buckets = [[], [], [], []];
        for (const item of allItems) {
            if (item.id === itemId) continue;
            const sameLocal = sqlEqual(item.local, source.local);
            const sameStatus = sqlEqual(item.status_id, source.status_id);
            const priority = sameLocal && sameStatus ? 3 : sameLocal ? 2 : sameStatus ? 1 : 0;
            buckets[priority].push(item);
        }
        // Fisher–Yates evita um comparator aleatório e preserva as quatro prioridades.
        for (const bucket of buckets) {
            for (let i = bucket.length - 1; i > 0; i--) {
                const j = Math.floor(random() * (i + 1));
                [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
            }
        }
        return buckets.reverse().flat().slice(0, limit);
    }
    return {
        getAllItems: () => allItems,
        getSlides: () => slides,
        getItemById: id => joinedItems.get(id) ?? null,
        getRelatedItems,
    };
}
