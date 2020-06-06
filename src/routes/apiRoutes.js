const { Router } = require('express');
const publicRoutes = require('./public/routes.public');
const privateRoutes = require('./private/routes.private');

const router = Router();

router.use('/public', publicRoutes);
router.use('/private', privateRoutes);

module.exports = router;
