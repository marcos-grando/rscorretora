import items from "./imoveis/items.json";
import construtoras from "./imoveis/construtoras.json";
import types from "./imoveis/types.json";
import status from "./imoveis/status.json";
import slide from "./imoveis/slide.json";
import { createPropertyCatalog } from "../util/propertyCatalog";

// Única fonte do site: estes cinco JSONs entram no build, sem dependência de outro projeto.
const catalog = createPropertyCatalog({ items, construtoras, types, status, slide });
export const { getAllItems, getSlides, getItemById, getRelatedItems } = catalog;
