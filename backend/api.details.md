## API Documentação

#### Criar usuário

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Cria um novo usuario)</code></summary>

##### Header

> | Header       | Content            |
> | ------------ | ------------------ |
> | Content-Type | `application/json` |

##### Parameters

```
{
    "name":"My Name",
    "email":"my@email.com"
    "password":"myPassword",
}
```

> | Name     | Optional? | Type   |
> | -------- | --------- | ------ |
> | Name     | required  | String |
> | Email    | required  | String |
> | Password | required  | String |

##### Responses

> | http code | response                                                                                                                                  |
> | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
> | `201`     | `{"success":"true", "message":"Usuário criado", "user": {"name":"My Name","password":"myPassword","email":"my@email.com", "id": "UUID"}}` |
> | `400`     | `{"success":"false","message":"Senha não pode ser vazio"}`                                                                                |
> | `405`     | `{"success":"false","message":"Chamada de API não permitida"}`                                                                            |
> | `409`     | `{"success":"false","message":"Email já registrado"}`                                                                                     |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-type: application/json" --data '{"name":"My Name","password":"myPassword","email":"my@email.com"}' http://localhost:4000/users/
> ```

</details>

---

#### Buscar usuário

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(Busca os dados de um usuário)</code></summary>

##### Header

> | Header       | Content            |
> | ------------ | ------------------ |
> | Content-Type | `application/json` |

##### Parameters

> | Name  | Optional? | Type        | example                    |
> | ----- | --------- | ----------- | -------------------------- |
> | id    | required  | String:UUID | `http://url/users/{id}`    |
> | Email | required  | String      | `http://url/users/{email}` |

##### Responses

> | http code | response                                                                                                                                     |
> | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `{"success":"true", "message":"Usuário retornado", "user": {"name":"My Name","password":"myPassword","email":"my@email.com", "id": "UUID"}}` |
> | `404`     | `{"success":"false", "message":"Usuário não encontrado."}`                                                                                   |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:4000/users/{UUID}
> ```

</details>

---

#### Listar usuários

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(Exibir uma lista de usuários)</code></summary>

##### Header

> | Header       | Content            |
> | ------------ | ------------------ |
> | Content-Type | `application/json` |

##### Responses

> | http code | content-type       | response                                                             |
> | --------- | ------------------ | -------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"success":"true", "message":"Usuários retornados", "data": [...]}` |
> | `404`     | `application/json` | `{"success":"false", "message":"Usuários não foram encontrados"}`    |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json"  http://localhost:4000/users
> ```

</details>

---

#### Editar usuário

<details>
 <summary><code>UPDATE</code> <code><b>/</b></code> <code>(Editar os dados de um usuário)</code></summary>

##### Header

> | Header       | Content            |
> | ------------ | ------------------ |
> | Content-Type | `application/json` |

##### Parameters

```
{
    "name":"My Name",
    "email":"my@email.com",
    "new_email":"new@email.com",
    "password":"myPassword"
}
```

> | name     | type     | data send | example                    |
> | -------- | -------- | --------- | -------------------------- |
> | id       | required | UUID      | `UUID`                     |
> | email    | required | string    | `{"email":"my@email.com"}` |
> | name     | required | string    | `{"name":"My Email"}`      |
> | password | required | string    | `{"password":"123456"}`    |

##### Responses

> | http code | content-type       | response                                                                                                                                       |
> | --------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"success":"true", "message":"Usuário atualizado!", "user": {"name":"My Name","password":"myPassword","email":"my@email.com", "id": "UUID"}}` |
> | `404`     | `application/json` | `{"success":"false", "message":"Usuário não encontrado."}`                                                                                     |
> | `405`     | `application/json` | `{"success":"false", "message":"Chamada de API não permitida."}`                                                                               |

##### Example cURL

> ```javascript
>  curl -X UPDATE -H "Content-Type: application/json" --data '{ "name":"My Name", "email":"my@email.com",  "password":"myPassword"}' http://localhost:3000/users/{UUID}
> ```

</details>

---

#### Deletar usuário

<details>
 <summary><code>DELETE</code> <code><b>/</b></code> <code>(Excluir os dados de um usuário)</code></summary>

##### Parameters

> | name | type     | data send | example |
> | ---- | -------- | --------- | ------- |
> | id   | required | UUID      | `UUID`  |

##### Responses

> | http code | content-type       | response                                                         |
> | --------- | ------------------ | ---------------------------------------------------------------- |
> | `200`     | `application/json` | `{"success":"true", "message":"Usuário removido!"`               |
> | `404`     | `application/json` | `{"success":"false", "message":"Usuário não encontrado."}`       |
> | `405`     | `application/json` | `{"success":"false", "message":"Chamada de API não permitida."}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/users/{UUID}
> ```

</details>

---

#### Metodos HTTP

| HTTP Metodos | Utilização                              |
| ------------ | --------------------------------------- |
| POST         | Utilizado em criação de usuário e login |
| GET          | Retornar listagens e usuario            |
| PUT          | Atualizar o registro do usuário         |
| DELETE       | Apagar registro do usuário              |

#### Códigos HTTP

| HTTP Metodos | Descrição             | Utilização                                                                                    |
| ------------ | --------------------- | --------------------------------------------------------------------------------------------- |
| 200          | Success OK            | Utilizado quando a requisição foi processada com sucesso                                      |
| 201          | Created               | Utilizado quando o novo registro foi salvo com sucesso                                        |
| 400          | Bad Request           | Utilizado quando a requisição está incompleta e não pode prosseguir                           |
| 401          | Unauthorized          | Utilizado quando o usuário falha ao se autenticar ou não tem permissão                        |
| 404          | Not Found             | Utilizado quando o recurso não foi encontrado                                                 |
| 409          | Conflict              | Utilizado quando se tenta registrar um usuário com o mesmo email                              |
| 418          | Teapot                | Erro inesperado no bcrypt                                                                     |
| 500          | Internal Server Error | Utilizado quando a requisição tenta fazer algo inesperado e o servidor não consegue processar |
