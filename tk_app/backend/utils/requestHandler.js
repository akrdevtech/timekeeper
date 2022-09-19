const eventLogHandler = require('./eventLogHandler')();
const crypto = require('crypto');

module.exports = () => {
    const getActualRequestDurationInMilliseconds = start => {
        const NS_PER_SEC = 1e9; //  convert to nanoseconds
        const NS_TO_MS = 1e6; // convert to milliseconds
        const diff = process.hrtime(start);
        return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
    };

    const addRequest = (req, res) => {
        const { method, path, rawHeaders, params, query, body, hostname } = req;
        const fullPath = `${hostname}${path}`;
        res.locals.loggerData = {
            request: { method, path: fullPath, headers: rawHeaders, params, query, body },
            serverTimestamp: new Date().toISOString(),
            activities: [],
            latency: 0,
            response: null,
            errors: null,
            user: null,
        }
        return true;
    };

    const addResponse = (req, res, data) => {
        const { locals: { requestStart, loggerData } } = res;
        const duration = getActualRequestDurationInMilliseconds(requestStart);
        res.locals.loggerData = { ...loggerData, response: data, latency: duration.toLocaleString(), txId: req.txId }
        return res.locals.loggerData;
    };

    const addError = (res, errors) => {
        const { locals: { requestStart, loggerData } } = res;
        const duration = getActualRequestDurationInMilliseconds(requestStart);
        res.locals.loggerData = { ...loggerData, latency: duration.toLocaleString(), errors }
        return res.locals.loggerData;
    };

    const responseInterceptor = (req, res) => {
        const oldWrite = res.write;
        const oldEnd = res.end;
        const chunks = [];

        res.write = (...restArgs) => {
            chunks.push(Buffer.from(restArgs[0]));
            oldWrite.apply(res, restArgs);
        };

        res.end = (...restArgs) => {
            if (restArgs[0]) {
                chunks.push(Buffer.from(restArgs[0]));
            }
            const body = Buffer.concat(chunks).toString('utf8');

            addResponse(req, res, body);

            if (res.locals.errors) {
                addError(res, res.locals.unformattedErrors);
            }

            eventLogHandler.apiLogger(res);
            oldEnd.apply(res, restArgs);
        };

    }

    const sendResponse = (data, res, next) => {
        res.locals.data = data;
        return next();
    }

    const requestInterceptor = (req, res, next) => {
        req.txId = crypto.randomUUID();
        console.log(`\n\n::::Initiating Transaction:::: TxId: ${req.txId}`)
        res.locals.requestStart = process.hrtime();
        addRequest(req, res);
        req.sendResponse = sendResponse;
        responseInterceptor(req, res);
        next();
    };

    return {
        requestInterceptor,
    }
};
