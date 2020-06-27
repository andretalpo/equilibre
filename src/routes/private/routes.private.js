const { Router } = require('express');
const jwt = require('jsonwebtoken');
const userControler = require('../../controlers/userControler/user.controler');
const cardControler = require('../../controlers/cardControler/card.controler');
const categoryControler = require('../../controlers/categoryControler/category.controler');
const expenseControler = require('../../controlers/expenseControler/expense.controler');

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
        { expiresIn: process.env.JWT_USER_REFRESH_TOKEN_EXPIRATION },
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

router.get('/user', userControler.listOne);

router.post('/card', cardControler.insert);
router.get('/card/:user', cardControler.listAll);
router.delete('/card/:id', cardControler.deleteOne);
router.put('/card/:id', cardControler.editOne);
router.get('/category/:user/:name', categoryControler.listOne);

router.get('/category/:user', categoryControler.listAll);
router.post('/category', categoryControler.insert);
router.put('/category', categoryControler.editOne);
router.delete('/category', categoryControler.deleteOne);

router.post('/expense', expenseControler.insert);
router.get('/expense/:card', expenseControler.listAll);
router.delete('/expense/:id', expenseControler.deleteOne);
router.put('/expense/:id', expenseControler.editOne);

router.get('/totalValue', expenseControler.getTotalValue);
router.get('/valueByCategory', expenseControler.getValueByCategory);
router.get('/topTenExpenses', expenseControler.getTopTenExpenses);

module.exports = router;