import { readFileSync } from "node:fs";
import { createPropertyCatalog } from "../src/util/propertyCatalog.js";

const read = name => JSON.parse(readFileSync(new URL("../src/data/imoveis/" + name + ".json", import.meta.url), "utf8"));
const data = Object.fromEntries(["items", "construtoras", "types", "status", "slide"].map(name => [name, read(name)]));
const catalog = createPropertyCatalog(data);
for (const row of catalog.getAllItems()) {
    if (!row.details || !["dorms", "banheiros", "garagens"].every(key => row.details[key]))
        throw new Error("Imóvel " + row.id + ": confira extradb.details.");
    const item = catalog.getItemById(row.id);
    if (!item.status_name || !item.type_name)
        throw new Error("Imóvel " + row.id + ": informe tipo e situação usados na página.");
    for (const field of ["aptoimg", "condimg", "plantimg", "aptoinfo", "condinfo", "plantinfo"])
        if (!Array.isArray(item.extradb?.[field])) throw new Error("Imóvel " + row.id + ": extradb." + field + " precisa ser um array.");
}
console.log(JSON.stringify({ valid: true, counts: Object.fromEntries(Object.entries(data).map(([name, rows]) => [name, rows.length])),
    derived: { items: catalog.getAllItems().length, slides: catalog.getSlides().length } }));
