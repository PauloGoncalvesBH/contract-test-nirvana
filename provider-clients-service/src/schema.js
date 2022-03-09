const { Joi, validate } = require('express-validation')

const schemaPostClients = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().positive().integer().required(),
  })
}

function validatePostSchema () {
  return validate(schemaPostClients, { keyByField: false }, { abortEarly: false })
}

module.exports = {
  validatePostSchema,
}
