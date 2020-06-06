const { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

const protectedRouteMiddleware = (req, res, next) => {
    const token = req.get('Authorization') || req.get('authorization');

    if (!token) {
        res.status(401).json({ message: 'Token not found' });
        return;
    }

    try {
        const user = jwt.verify(token.split(' ')[1], process.env.JWT_USER_TOKEN_HASH);

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'jwt expired' });
    }
};

router.use(protectedRouteMiddleware);

router.get('/refresh-token', (req, res) => {
    const { name, email, id } = req.user;

    const token = jwt.sign(
        { name, email, id },
        process.env.JWT_USER_TOKEN_HASH,
        { expiresIn: process.env.JWT_USER_TOKEN_EXPIRATION },
    );

    const refresh_token = jwt.sign(
        { name, email, id, token },
        process.env.JWT_USER_TOKEN_HASH,
        { expiresIn: process.env.JTW_USER_REFRESH_TOKEN_EXPIRATION },
    );

    res.status(200).json({
        type: 'Bearer',
        token,
        refresh_token,
    });
});

router.get('/verify-token', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

module.exports = router;