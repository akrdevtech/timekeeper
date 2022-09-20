const chalk = require("chalk");


module.exports = (location) => {
    const error = (position, txId, message) => {
        console.log(chalk.red(`\n\nTID: ${txId}\nLOC: ${location} : ${position}\nMSG: ${message}`));
    }

    const info = (position, txId, message) => {
        console.log(chalk.blue(`\n\nTID: ${txId}\nLOC: ${location} : ${position}\nMSG: ${message}`));
    }

    const log = (position, txId, message) => {
        console.log(`\n\nTID: ${txId}\nLOC: ${location} : ${position}\nMSG: ${message}`);
    }

    const success = (position, txId, message) => {
        console.log(chalk.green(`\n\nTID: ${txId}\nLOC: ${location} : ${position}\nMSG: ${message}`));
    }

    return {
        error,
        log,
        info,
        success,
    }
}