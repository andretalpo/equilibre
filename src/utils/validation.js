const joi = require('joi');

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/

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
      min: `${field}: Campo no mínimo ${min}`,
    },
  },
});

const name = joi.string()
  .required()
  .min(3)
  .max(100)
  .options(validation('Nome', 3, 100));

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
  .options(validation('Bandeira', 3, 100));

const stablishment = joi.string()
  .min(3)
  .max(100)
  .options(validation('Estabelecimento', 3, 100));

const expiration_date = joi.string()
  .min(7)
  .max(7)
  .options(validation('Data de expiração', 7, 7));

const id = joi.string()
  .required()
  .min(24)
  .max(24)
  .options(validation('Id', 24, 24));

const categoryId = joi.string()
  .required()
  .required()
  .min(24)
  .max(24)
  .options(validation('Id Categoria', 24, 24));

const cardId = joi.string()
  .required()
  .required()
  .min(24)
  .max(24)
  .options(validation('Id Cartão', 24, 24));

const userId = joi.string()
  .required()
  .min(24)
  .max(24)
  .options(validation('Id Usuário', 24, 24));

const date = joi.string()
  .required()
  .min(10)
  .max(10)
  .regex(dateRegex)
  .options(validation('Data', 10, 10, 'yyyy-MM-dd'))

const value = joi.number()
  .required()
  .min(0)
  .options(validation('Valor', 0))

module.exports = {
  name,
  email,
  password,
  provider,
  stablishment,
  expiration_date,
  id,
  cardId,
  categoryId,
  userId,
  date,
  value,
}