class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.message = msg;
    }

    static validationError(message = 'All fields are required!') {
        return new ErrorHandler(422, message);
    }

    static notFoundError(message = 'Not found!') {
        return new ErrorHandler(404, message);
    }

    static serverError(message = 'Internal error') {
        return new ErrorHandler(500, message);
    }

    static forbidden(message = 'Not allowed!') {
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;