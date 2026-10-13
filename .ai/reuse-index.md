# Recursos reutilizáveis

- `src/util/propertyCatalog.js`: `createPropertyCatalog` monta os joins de imóveis, slides e relacionados a partir dos cinco arrays locais. Valida IDs e referências. Consumidores: `src/data/catalog.js`, `scripts/validateData.js` e `tests/propertyCatalog.test.js`.
- `src/data/catalog.js`: entrada única de leitura estática. Exporta `getAllItems`, `getSlides`, `getItemById` e `getRelatedItems`. Consumidores: `App.jsx`, `Banner.jsx`, `Allitems.jsx` e `Residencial.jsx`.
- `src/components/reuts/Linkto.jsx`: mantém os caminhos públicos existentes, inclusive a rota de imóvel por ID/nome/localidade. Consumidores: banner, cards, menu, contato e blog.
