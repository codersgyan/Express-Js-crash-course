const ErrorHandler = require('../errors/ErrorHandler');

function apiKey(req, res, next) {
    const api_key = '1234567';
    const userApiKey = req.query.api_key;
    if (userApiKey && (userApiKey === api_key)) {
        next();
    } else {
        next(ErrorHandler.forbidden('Api key is not valid!'));
        // res.json({ message: 'Not allowed!'});
    }

}

module.exports = apiKey;