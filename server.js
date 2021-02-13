const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/index');
const productRouter = require('./routes/products');
const ErrorHandler = require('./errors/ErrorHandler');
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(productRouter);
app.use(mainRouter);
app.use((req, res, next) => {
    return res.json({ message: 'page not found!'});
});

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
