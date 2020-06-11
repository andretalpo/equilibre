const joi = require('joi');

const nameRegex = /^[a-zA-z]/

const validation = (field, min, max, mask) => ({
  language: {
    any: {
      required: `${field} é Obrigatório`,
      empty: `${field} é Obrigatório`,
    },
    string: {
      min: `${field}: campo de no mínimo ${min} caracteres`,
      required: `${field} é Obrigatório`,
      max: `${field}: campo de no máximo ${max} caracteres`,
      email: 'Necessário um e-mail válido',
      base: `${field}: campo do tipo string`,
      regex: {
        base: mask ? `Necessário enviar o campo na máscara ${mask}` : '',
      },
    },
    number: {
      base: `${field}: Campo do tipo numérico`,
    },
  },
});

const name = joi.string()
  .required()
  .min(3)
  .max(100)
  .regex(nameRegex)
  .options(validation('Nome', 3, 100, 'Somente letras maiúsculas ou minúsculas'));

const email = joi.string()
  .required()
  .email()
  .options(validation('Email', undefined, undefined, 'example@example.com.br'));

const password = joi.string()
  .required()
  .min(5)
  .max(100)
  .options(validation('Senha', 5, 100));

const provider = joi.string()
  .required()
  .min(3)
  .max(100)
  .regex(nameRegex)
  .options(validation('Bandeira', 3, 100, 'Somente letras maiúsculas ou minúsculas'));

const expiration_date = joi.string()
  .min(7)
  .max(7)
  .options(validation('Data de expiração', 7, 7));

const id = joi.string()
  .required()
  .options(validation('Id'));

module.exports = {
  name,
  email,
  password,
  provider,
  expiration_date,
  id,
}