const { Router } = require('express');
const AuthControler = require('../../controlers/authControler/auth.controler');

const router = Router();

router.post('/auth/signup', AuthControler.signup);
router.post('/auth/login', AuthControler.login);

module.exports = router;