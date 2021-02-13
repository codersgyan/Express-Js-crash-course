const router = require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
let products = require('../productData');
const apiKeyMiddleware = require('../middlewares/apiKey');

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'My Product page'
    });
});

router.get('/api/products', (req,res) => {
    res.json(products);
});

router.post('/api/products', apiKeyMiddleware, (req, res, next) => {
    // try {
    //     console.log(city);
    // } catch(err) {
    //     next(ErrorHandler.serverError(err.message));
    // }

    const { name, price } = req.body;

    if (!name || !price) {
        next(ErrorHandler.validationError('Name and price fields are required!'));
        // throw new Error('All fields are required!');
        // return res.status(422).json({ error: 'All fields are required.'});
    }
    const product = {
        name,
        price,
        id: new Date().getTime().toString()
    }
    products.push(product);
    res.json(product);
});

router.delete('/api/products/:productId', (req, res) => {
    products = products.filter((product) => req.params.productId !== product.id);
    res.json({ status: 'OK' });
});

module.exports = router;