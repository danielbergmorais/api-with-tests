/* eslint-disable */

const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const jwt = require('jsonwebtoken')
require('dotenv/config')

describe('Autenticação', () => {
  describe('Login', () => {
    it('Usuário logou! Code[200]', async () => {
      const user = {
        email: 'jane@email.com',
        password: '123456',
      }

      const { body, statusCode } = await request.post('/auth/signin').send(user)
      expect(statusCode).toBe(200)
      expect(jwt.verify(body.token, process.env.SECRET_KEY)).toBeTruthy()
    })

    it('Usuário não existe! Code[404]', async () => {
      const user = {
        email: 'test1@email.com',
        password: '123456',
      }

      await request.post('/auth/signin').send(user).expect(404)
    })

    it('Senha incorreta! Code[401]', async () => {
      const user = {
        email: 'jane@email.com',
        password: '1234567',
      }

      await request.post('/auth/signin').send(user).expect(401)
    })

    it('Não é email! Code[401]', async () => {
      const user = {
        email: 123,
        password: '123456',
      }

      await request.post('/auth/signin').send(user).expect(401)
    })

    it('Não é email! Code[401]', async () => {
      const user = {
        email: 'janeemail.com',
        password: '123456',
      }

      await request.post('/auth/signin').send(user).expect(401)
    })

    it('Não tem email! Code[401]', async () => {
      const user = {
        password: '123456',
      }

      await request.post('/auth/signin').send(user).expect(401)
    })

    it('Não tem senha! Code[401]', async () => {
      const user = {
        email: 'jane@email.com',
      }
      await request.post('/auth/signin').send(user).expect(401)
    })
  })

  describe('Logado', () => {
    it('Usuario utilizou o token correto! Code [200]', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NDBhOTBlLWViN2YtNGFmZS04MTE0LWQzMzFiNDY5NTA3MyIsImlhdCI6MTczNTMwODM0NCwiZXhwIjoxNzY2ODQ0MzQ0fQ.XpJQpbSShEoNlzRFbhUobKsuhlgGgmXlwHyE_KCJZyw'

      const { body, statusCode } = await request
        .get('/auth/protected')
        .set('Authorization', 'Bearer ' + token)
      expect(statusCode).toBe(200)
      expect(body.success).toBeTruthy()
    })

    it('Usuario utilizou o token expirado! Code [401]', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NDBhOTBlLWViN2YtNGFmZS04MTE0LWQzMzFiNDY5NTA3MyIsImlhdCI6MTczNTMwNTMxNiwiZXhwIjoxNzM1MzA1MzE3fQ.xNLIgAXhMZXenf97nGvIWeCOGvpp1kTwrF9XQXceHpA'

      const { body, statusCode } = await request
        .get('/auth/protected')
        .set('Authorization', 'Bearer ' + token)
      expect(statusCode).toBe(401)
      expect(!body.success).toBeTruthy()
    })

    it('Usuario utilizou o token incorreto! Code [500]', async () => {
      const token =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NDBhOTBlLWViN2YtNGFmZS04MTE0LWQzMzFiNDY5NTA3MyIsImlhdCI6MTczNTMwODM0NCwiZXhwIjoxNzY2ODQ0MzQ0fQ.8cQkxS6fisrdPUWpYD18lhbCNdptqdekXedjH9QSxCUaROsgr55klHoIeJ1HoqbBMB7tpObUdd5VUpLiCWL8lQ'

      const { body, statusCode } = await request
        .get('/auth/protected')
        .set('Authorization', 'Bearer ' + token)

      expect(statusCode).toBe(500)
      expect(body.message).toBe('invalid signature')
      expect(!body.success).toBeTruthy()
    })

    it('Usuario sem o token! Code [401]', async () => {
      const token = ''

      const { body, statusCode } = await request
        .get('/auth/protected')
        .set('Authorization', 'Bearer ' + token)
      expect(statusCode).toBe(401)
      expect(!body.success).toBeTruthy()
    })
  })
})
