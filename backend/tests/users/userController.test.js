/* eslint-disable */

const app = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

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
        expect(body.message).toBe('Usuário criado')
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
        expect(body.message).toBe('Email já registrado')
      })

      it('Erro na senha! Code[400]', async () => {
        const user = {
          name: 'Jane Doe',
          email: 'test2@email.com',
          password: '',
        }

        const { body, statusCode } = await request.post('/users').send(user)

        expect(statusCode).toBe(400)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Senha não pode estar vazia')
      })
    })

    describe('Read', () => {
      it('Usuário encontrado! Code [200]', async () => {
        const userEmail = 'test@email.com'
        const { body, statusCode } = await request.get(`/users/${userEmail}`)

        expect(statusCode).toBe(200)
        expect(body.success).toBeTruthy()
        expect(body.message).toBe('Usuário retornado')
      })

      it('Usuário NÃO encontrado! Code [404]', async () => {
        const userId = '123'
        const { body, statusCode } = await request.get(`/users/${userId}`)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Usuário não encontrado')
      })

      it('Usuário NÃO encontrado [UUID]! Code [404]', async () => {
        const userId = '11ab7ac7-ee0c-49c4-b0a1-adc7b5bb4587'
        const { body, statusCode } = await request.get(`/users/${userId}`)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Usuário não encontrado')
      })
    })

    describe('List', () => {
      it('Deverá ter status 200', async () => {
        const { body, statusCode } = await request.get('/users')

        expect(statusCode).toBe(200)
        expect(body.success).toBeTruthy()
        expect(body.message).toBe('Usuários retornados')
      })
    })

    describe('Update', () => {
      it('Usuário atualizado! Code [200]', async () => {
        const user = {
          new_email: 'john@email.com',
          name: 'John Doe',
          email: 'test@email.com',
          password: '654321',
        }
        const { body, statusCode } = await request.put('/users/').send(user)

        expect(statusCode).toBe(200)
        expect(body.success).toBeTruthy()
        expect(body.user.name).toBe(user.name)
        expect(body.message).toBe('Usuário atualizado!')
      })

      it('Usuário Não encontrado! Code [404]', async () => {
        const user = {
          new_email: 'john@email.com',
          name: 'John Doe',
          email: 'not@found.com',
          password: '654321',
        }

        const { body, statusCode } = await request.put('/users/').send(user)
        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Usuário não encontrado')
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
        expect(body.message).toBe('Usuário removido')
      })

      it('Usuário não encontrado! Code [404]', async () => {
        const user = {
          email: 'another@email.com',
        }
        const { body, statusCode } = await request.delete('/users').send(user)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Usuário não encontrado')
      })

      it('Usuário não encontrado [ID]! Code [404]', async () => {
        const userId = '11ab7ac7-ee0c-49c4-b0a1-adc7b5bb4587'
        const { body, statusCode } = await request.delete(`/users/${userId}`)

        expect(statusCode).toBe(404)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Usuário não encontrado')
      })

      it('Usuário não encontrado! Code [405]', async () => {
        const user = {}
        const { body, statusCode } = await request.delete('/users').send(user)

        expect(statusCode).toBe(405)
        expect(body.success).toBeFalsy()
        expect(body.message).toBe('Chamada de API não permitida')
      })
    })
  })
})
