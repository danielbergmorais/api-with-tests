# API Rest With Test (working)
## Node | Express | Jest

_Projeto reutilizado de uma prova prática de programação para adicionar modulo de testes com o framework JEST_

Utilizados neste projeto
- [Docker]
- [Postgres]
- [Node.js]
- [Express]
- [Jest]
- [Sequelize]


#### Comandos test

`npm test`

#### Comandos Sequelize

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli migration:create --name alter-user
```