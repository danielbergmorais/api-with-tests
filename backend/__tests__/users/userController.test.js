/* eslint-disable */

const app = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const messages = require('../../languages/pt-BR')

describe('Usuário', () => {
  describe('Endpoint', () => {
    describe('Create', () => {
      it('Usuário Criado! Code[201]', async () => {
        const user = {
          name: 'Jane Doe',
          email: 'test@email.com',
          password: '123456',
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(201)
        expect(body.success).toBeTruthy()
        expect(body.message).toBe(messages['user-create'])
      })

      it('Usuário duplicado! Code[409]', async () => {
        const user = {
          name: 'Jane Doe',
          email: 'test@email.com',
          password: '123456',
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(409)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-create-duplicate'])
      })

      it('Usuário sem nome! Code[400]', async () => {
        const user = {
          email: 'test2@email.com',
          password: '123456',
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(400)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-create-empty-fields'])
      })

      it('Usuário sem nome e email! Code[400]', async () => {
        const user = {
          password: '123456',
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(400)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-create-empty-fields'])
      })

      it('Usuário sem dados! Code[400]', async () => {
        const user = {
          
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(400)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-create-empty-fields'])
      })

      it('Usuario com senha em branco! Code[400]', async () => {
        const user = {
          name: 'Jane Doe',
          email: 'test2@email.com',
          password: '',
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(400)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-create-empty-fields'])
      })
    })

    describe('Read', () => {
      it('Usuário encontrado! Code [200]', async () => {
        const userEmail = 'test@email.com'
        const { body, statusCode } = await request.get(`/users/${userEmail}`)

        expect(statusCode).toBe(200)
        expect(body.success).toBeTruthy()
        expect(body.message).toBe(messages['user-get'])
      })

      it('Usuário NÃO encontrado! Code [404]', async () => {
        const userId = '123'
        const { body, statusCode } = await request.get(`/users/${userId}`)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-not_found'])
      })

      it('Usuário NÃO encontrado [UUID]! Code [404]', async () => {
        const userId = '11ab7ac7-ee0c-49c4-b0a1-adc7b5bb4587'
        const { body, statusCode } = await request.get(`/users/${userId}`)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-not_found'])
      })
    })

    describe('List', () => {
      it('Deverá ter status 200', async () => {
        const { body, statusCode } = await request.get('/users')

        expect(statusCode).toBe(200)
        expect(body.success).toBeTruthy()
        expect(body.message).toBe(messages['user-list'])
      })
    })

    describe('Update', () => {
      it('Usuário atualizado! Code [200]', async () => {
        const userEmail = 'test@email.com'
        await request.get(`/users/${userEmail}`).then(async (res) => {
          const user = {
            name: 'John Doe',
            email: 'test@email.com',
            password: '654321',
          }

          const userID = res.body.user.id
          const { body, statusCode } = await request
            .put(`/users/${userID}`)
            .send(user)
          expect(statusCode).toBe(200)
          expect(body.success).toBeTruthy()
          expect(body.user.name).toBe(user.name)
          expect(body.message).toBe(messages['user-update'])
        })
      })

      it('Usuário Não encontrado! Code [404]', async () => {
        const userID = 'ce00ef28-a1fd-429c-92b6-8c61120a2fda'

        const user = {
          name: 'John Doe',
          email: 'not@found.com',
          password: '654321',
        }

        const { body, statusCode } = await request
          .put(`/users/${userID}`)
          .send(user)
        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-not_found'])
      })
    })

    describe('Delete', () => {
      it('Usuário removido! Code [200]', async () => {
        const user = {
          email: 'test@email.com',
        }
        const { body, statusCode } = await request.delete('/users').send(user)

        expect(statusCode).toBe(200)
        expect(body.success).toBeTruthy()
        expect(body.message).toBe(messages['user-delete'])
      })

      it('Usuário não encontrado! Code [404]', async () => {
        const user = {
          email: 'another@email.com',
        }
        const { body, statusCode } = await request.delete('/users').send(user)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-not_found'])
      })

      it('Usuário não encontrado [ID]! Code [404]', async () => {
        const userId = '11ab7ac7-ee0c-49c4-b0a1-adc7b5bb4587'
        const { body, statusCode } = await request.delete(`/users/${userId}`)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['user-not_found'])
      })

      it('Usuário deletar sem dados! Code [405]', async () => {
        const user = {}
        const { body, statusCode } = await request.delete('/users').send(user)

        expect(statusCode).toBe(405)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe(messages['not_allowed'])
      })
    })
  })
})
