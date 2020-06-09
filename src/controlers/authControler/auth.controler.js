const User = require('../../models/User');
const joi = require('joi');
const paramsSchema = require('../../utils/validation');
const passwordUtils = require('../../utils/passwordUtils');
const jwt = require('jsonwebtoken');

class AuthControler {
  signup = async (req, res) => {
    
    const { name, password, email } = paramsSchema;
    const signupSchema = joi.object()
    .options({ abortEarly:false })
    .keys({
      name, password, email,
    })

    const validation = joi.validate(req.body, signupSchema);

    if (validation.error) {
      const errors = validation.error.details.map(error => ({
          error: error.message.split('" ')[1],
          field: error.context.key,
      }));

      res.status(400).json(errors);
      return;
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(400).json({ message: 'Usuário já cadastrado' });
      return;
    }

    req.body.password = passwordUtils.encrypt(req.body.password);

    await User.create(req.body);

    res.status(200).json({ message: 'Usuário cadastrado com sucessso' });
    
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    const userFromDb = await User.findOne({ email });

    if (!userFromDb) {
      res.status(401).json({ message: 'Credenciais não conferem' });
      return;
    }

    const isPasswordValid = passwordUtils.verify(password, userFromDb.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciais não conferem' });
      return;
    }

    const token = jwt.sign(
      { name: userFromDb.name, email: userFromDb.email, id: userFromDb._id },
      process.env.JWT_USER_TOKEN_HASH,
      { expiresIn: process.env.JWT_USER_TOKEN_EXPIRATION },
    );

    const refresh_token = jwt.sign(
      { name: userFromDb.name, email: userFromDb.email, id: userFromDb._id, token },
      process.env.JWT_USER_TOKEN_HASH,
      { expiresIn: process.env.JWT_USER_REFRESH_TOKEN_EXPIRATION },
    );

    res.status(200).json({
      type: 'Bearer',
      token,
      refresh_token,
    });
  };
}

module.exports = new AuthControler();
