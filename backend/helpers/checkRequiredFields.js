const isEmpty = require('../helpers/checkIsEmpty')
const messages = require('../languages/pt-BR')

const requireFields = (values, required) => {
  let errors = {}

  required.map((field) => {
    if (isEmpty(values[field])) {
      errors[field] = messages.required
    }
  })

  return errors
}

module.exports = requireFields
