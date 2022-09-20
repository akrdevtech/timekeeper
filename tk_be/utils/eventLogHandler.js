module.exports = () => {

    const apiLogger = (res) => {
        const { locals: { loggerData } } = res;
        if (loggerData) {
            const {
                request: { method, path, headers, params, query, body },
                serverTimestamp,
                activities,
                latency,
                response,
                errors,
                user,
                txId
            } = loggerData
            console.log(`REQUEST => TxId: ${txId}`);
            console.log(`method  : ${method}`);
            console.log(`path    : ${path}`);
            console.log(`headers : ${JSON.stringify(headers)}`);
            console.log(`params  : ${JSON.stringify(params)}`);
            console.log(`query   : ${JSON.stringify(query)}`);
            console.log(`body    : ${JSON.stringify(body)}`);
            console.log(`\n\nSETTINGS => TxId: ${txId}`);
            console.log(`timestamp    : ${JSON.stringify(serverTimestamp)}`);
            console.log(`latency      : ${JSON.stringify(latency)}`);
            console.log(`user         : ${JSON.stringify(user)}`);
            console.log(`activities   : ${JSON.stringify(activities)}`);
            console.log(`\n\RESPONSE => TxId: ${txId}`);
            console.log(`body    : ${JSON.stringify(response)}`);
            console.log(`latency : ${JSON.stringify(latency)}`);
            console.log(`\n\ERRORS => TxId: ${txId}`);
            console.log(`body    : ${JSON.stringify(errors)}`);
        }
    }

    return {
        apiLogger,
    }
}
