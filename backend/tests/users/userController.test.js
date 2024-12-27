//Describe -> Bloco de test - Test Suits
//IT or TEST -> Teste unitario - Test case
//EXPECT -> asserçoes do resultado

const app = require("../../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);


describe('Usuário', ()=> {
    describe('Endpoint', ()=> {

        describe('Create', ()=> {
            it("Usuário Criado! Code[201]", async() => {
                const user = {
                    "name": "Jane Doe",
                    "email": "test@email.com",
                    "password": "123456"
                }

                await request.post('/users').send(user).expect(201)
            })

            it("Usuário duplicado! Code[409]", async() => {
                const user = {
                    "name": "Jane Doe",
                    "email": "test@email.com",
                    "password": "123456"
                }

                await request.post('/users').send(user).expect(409)
            })

            it("Erro na senha! Code[418]", async() => {
                const user = {
                    "name": "Jane Doe",
                    "email": "test2@email.com",
                    "password": ""
                }

                await request.post('/users').send(user).expect(418)
            })
        })

        describe('Read', ()=> {
            it("Usuário encontrado! Code [200]", async() => {
                
                const userEmail = 'test@email.com';
                await request.get(`/users/${userEmail}`).expect(200)
            })

            it("Usuário NÃO encontrado! Code [404]", async() => {
                
                const userId = '123';
                await request.get(`/users/${userId}`).expect(404)
            })

            it("Usuário NÃO encontrado [UUID]! Code [404]", async() => {
                await request.get('/users/11ab7ac7-ee0c-49c4-b0a1-adc7b5bb4587').expect(404)
            })

        })

        describe('List', ()=> {
            it("Deverá ter status 200", async() => {
                await request.get('/users').expect(200)
            })
        })

        describe('Update', () =>{
            const user = {
                "new_email": "john@email.com",
                "name": "John Doe",
                "email": "test@email.com",
                "password": "654321"
            }

            it("Usuário atualizado! Code [200]", async() => {
                const {body, statusCode} = await request.put(`/users/`).send(user);
                expect(statusCode).toBe(200)
                expect(body.user.name).toBe(user.name)
            })


            it("Usuário Não encontrado! Code [404]", async() => {
                 await request.put(`/users/`).send({email: "not@found.com"}).expect(404);
            })

        })

        describe('Delete', ()=> {
            const user = {
                "email": "test@email.com",
            }

            it("Usuário removido! Code [200]", async() => {
                await request.delete('/users').send(user).expect(200)
            })

            it("Usuário não encontrado! Code [404]", async() => {
                await request.delete('/users').send(user).expect(404)
            })

            it("Usuário não encontrado [ID]! Code [404]", async() => {
                await request.delete('/users/11ab7ac7-ee0c-49c4-b0a1-adc7b5bb4587').send(user).expect(404)
            })
        })
        
    })
})

