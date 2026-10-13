# RS Corretora de Imóveis

Website estático em React/Vite. O catálogo é mantido nos próprios JSONs do projeto, sem Supabase e sem vínculo com o simulador `rsadmin`.

## Executar

```sh
npm ci
npm run dev
```

`npm run build` valida os dados e gera `dist/`. `npm run preview` serve o build. `npm test` testa os joins e a seleção de relacionados. Não é necessário configurar variáveis de ambiente.

## Fonte dos imóveis

Edite somente os arquivos de `src/data/imoveis/`:

- `items.json`: imóveis, preços, endereço, coordenadas, imagens, características e detalhes.
- `construtoras.json`: construtoras e logotipos.
- `types.json`: tipos de imóvel.
- `status.json`: situações dos imóveis.
- `slide.json`: banners, vínculo com o imóvel e ordem de exibição.

Os IDs e vínculos foram preservados. `items.type_id/status_id/construtora_id` apontam para os respectivos catálogos; `slide.item_id` aponta para um imóvel. Não reutilize nem altere IDs de imóveis já publicados se quiser preservar os links existentes.

`src/data/catalog.js` reúne os arquivos; `src/util/propertyCatalog.js` deriva a listagem, os banners e os detalhes. Não existem cópias editáveis das antigas views. Relacionados excluem o imóvel atual, priorizam mesma localidade/situação e limitam a dez, com desempate aleatório.

Após editar um JSON, execute `npm run validate:data` ou `npm run build` e publique o novo build. O conteúdo não é alterado por um painel nem por outro projeto.

## Recursos preservados

Rotas, filtros, paginação, galerias, contato/WhatsApp e blog continuam no site. O blog mantém sua fonte própria em `public/blog.json`.

URLs de imagens continuam apontando para o Cloudinary apenas para exibição, sem upload ou exclusão. Mapas continuam usando os serviços externos anteriores (OpenStreetMap/Overpass/Google Maps); fontes e ícones mantêm os provedores originais.

O projeto não possui banco, autenticação ou operações de CRUD. Não configure novamente as antigas variáveis Supabase nem restaure deploys anteriores à migração.
