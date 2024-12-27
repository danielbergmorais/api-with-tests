# API Rest With Test (working)
## Node | Express | Jest

_Projeto reutilizado de uma prova prática de programação para adicionar modulo de testes com o framework JEST_

Utilizados neste projeto
- [Docker] Containers inicialmente para o banco postgres
- [Postgres] Banco de dados
- [Node.js] Framework JS para backend
- [Express] Framework para estrutura da API
- [Jest] Framework para testes unitários
- [Sequelize] Framework para ORM, Migrations e Seeds
- [Eslint] Ferramenta para verificar e corrigir codigos fora do padrão
- [Prettier] Ferramenta para formatar o código para colocar no padrão


#### Comandos npm

Executar testes
`npm test`

Formatar o código
`npm run pretty`

Verificar erros de padrão no código
`npm run lint`

Executar o servidor
`npm run start` ou `npm run dev`

#### Comandos Sequelize

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli migration:create --name alter-user
```