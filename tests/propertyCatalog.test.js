import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createPropertyCatalog } from "../src/util/propertyCatalog.js";

const read = name => JSON.parse(readFileSync(new URL("../src/data/imoveis/" + name + ".json", import.meta.url), "utf8"));
const exported = Object.fromEntries(["items", "construtoras", "types", "status", "slide"].map(name => [name, read(name)]));
const catalog = createPropertyCatalog(exported);

function fixture() {
    const item = (id, local, status_id) => ({ id, type_id: 1, construtora_id: 1, status_id, name: "Imóvel " + id,
        bairro: local, cidade: "Cidade", local: local + ", Cidade", thumb: { url: "thumb-" + id }, valor: id * 100,
        extradb: { details: { dorms: { min: 1, max: 2 } } } });
    return {
        items: [item(1, "Centro", 1), item(2, "Centro", 1), item(3, "Centro", 2), item(4, "Outro", 1), item(5, "Outro", 2)],
        types: [{ id: 1, single: "Residencial" }], construtoras: [{ id: 1, logo: { url: "logo" } }],
        status: [{ id: 1, name: "Pronto" }, { id: 2, name: "Em construção" }],
        slide: [{ id: 1, item_id: 5, detalhes: ["Vista"], position: 2, banner: { url: "banner-5" } },
            { id: 2, item_id: 2, detalhes: [], position: 1, banner: { url: "banner-2" } }],
    };
}

test("catálogo conserva todos os IDs e conteúdos do conjunto real", () => {
    assert.equal(catalog.getAllItems().length, exported.items.length);
    assert.equal(catalog.getSlides().length, exported.slide.length);
    for (const raw of exported.items) {
        const item = catalog.getItemById(raw.id);
        for (const [key, value] of Object.entries(raw)) assert.deepEqual(item[key], value);
        assert.equal(item.type_name.single, exported.types.find(type => type.id === raw.type_id).single);
        assert.equal(item.status_name?.name ?? null, exported.status.find(status => status.id === raw.status_id)?.name ?? null);
    }
});

test("listagem reproduz os nomes, detalhes e localidade da view", () => {
    const catalog = createPropertyCatalog(fixture());
    assert.deepEqual(catalog.getAllItems()[0], { id: 1, type_id: 1, name: "Imóvel 1", tipo: "Residencial",
        local: "Centro, Cidade", valor: 100, thumb: "thumb-1", details: { dorms: { min: 1, max: 2 } }, status: "Pronto", status_id: 1 });
});

test("slides são ordenados por position/id e referenciam o imóvel, não o ID do banner", () => {
    const catalog = createPropertyCatalog(fixture());
    const [slide] = catalog.getSlides();
    assert.equal(slide.id, 2); assert.equal(slide.item_id, 2);
    assert.equal(slide.banner, "banner-2"); assert.equal(slide.item_name, "Imóvel 2");
    assert.equal(slide.item_valor, 200); assert.equal(slide.status_name, "Pronto");
});

test("detalhe preserva os aliases do join e retorna null para ID inexistente", () => {
    const catalog = createPropertyCatalog(fixture());
    assert.deepEqual(catalog.getItemById(1).const_logo, { logo: { url: "logo" } });
    assert.deepEqual(catalog.getItemById(1).type_name, { single: "Residencial" });
    assert.deepEqual(catalog.getItemById(1).status_name, { name: "Pronto" });
    assert.equal(catalog.getItemById(99999), null);
    assert.equal(catalog.getItemById(null), null);
});

test("joins opcionais e concatenação nula seguem a semântica SQL", () => {
    const data = fixture(); Object.assign(data.items[0], { construtora_id: null, status_id: null, bairro: null, thumb: null, extradb: null });
    const catalog = createPropertyCatalog(data);
    assert.equal(catalog.getItemById(1).const_logo, null);
    assert.equal(catalog.getItemById(1).status_name, null);
    assert.equal(catalog.getAllItems()[0].local, null);
    assert.equal(catalog.getAllItems()[0].thumb, null);
    assert.equal(catalog.getAllItems()[0].details, null);
});

test("relacionados preservam prioridades, limite e exclusão do próprio imóvel", () => {
    const catalog = createPropertyCatalog(fixture());
    assert.deepEqual(catalog.getRelatedItems(1, 10, () => 0.5).map(row => row.id), [2, 3, 4, 5]);
    assert.deepEqual(catalog.getRelatedItems(1, 2, () => 0.5).map(row => row.id), [2, 3]);
    assert.deepEqual(catalog.getRelatedItems(999), []);
    assert.deepEqual(catalog.getRelatedItems(1, 0), []);
    for (const item of exported.items) {
        const result = catalog.getRelatedItems(item.id);
        assert.ok(result.length <= 10); assert.ok(!result.some(row => row.id === item.id));
        assert.equal(new Set(result.map(row => row.id)).size, result.length);
    }
});

test("empates são embaralhados sem modificar a ordem do catálogo", () => {
    const data = fixture(); data.items.push({ ...data.items[1], id: 6 });
    const catalog = createPropertyCatalog(data); const ids = catalog.getAllItems().map(row => row.id);
    assert.notDeepEqual(catalog.getRelatedItems(1, 10, () => 0).map(row => row.id), catalog.getRelatedItems(1, 10, () => 0.999).map(row => row.id));
    assert.deepEqual(catalog.getAllItems().map(row => row.id), ids);
});

test("IDs repetidos e referências quebradas são rejeitados", () => {
    const repeated = fixture(); repeated.items.push(repeated.items[0]);
    assert.throws(() => createPropertyCatalog(repeated), /repetido/);
    const missingType = fixture(); missingType.items[0].type_id = 999;
    assert.throws(() => createPropertyCatalog(missingType), /items.type_id/);
    const missingSlide = fixture(); missingSlide.slide[0].item_id = 999;
    assert.throws(() => createPropertyCatalog(missingSlide), /slide.item_id/);
});
