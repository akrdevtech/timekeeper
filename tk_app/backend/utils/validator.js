const errorUtils = require('./errors');
const {
    types: {
        RequestValidationError
    }
} = errorUtils;

const validatorMiddleware = (schemas) => (req, res, next) => {
    let validationErrors = [];
    if (schemas.body) {
        const response = schemas.body.validate(req.body, { abortEarly: false });
        response && response.error && (validationErrors = [...validationErrors, ...response.error.details]);
    }
    if (schemas.params) {
        const response = schemas.params.validate(req.params, { abortEarly: false });
        response && response.error && (validationErrors = [...validationErrors, ...response.error.details]);
    }
    if (schemas.query) {
        const response = schemas.query.validate(req.query, { abortEarly: false });
        response && response.error && (validationErrors = [...validationErrors, ...response.error.details]);
    }
    if (schemas.headers) {
        const response = schemas.body.validate(req.body, { abortEarly: false });
        response && response.error && (validationErrors = [...validationErrors, ...response.error.details]);
    }
    if (validationErrors.length) {
        return next(new RequestValidationError("VALIDATION_ERROR", JSON.stringify(validationErrors)));
    }
    return next();
}

module.exports = {
    validatorMiddleware
}