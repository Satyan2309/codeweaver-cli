const chalk = require('chalk');

const logger = {
    info : msg => console.log(chalk.blue(msg)),
    success : msg => console.log(chalk.green(msg)),
    warn : msg => console.log(chalk.yellow(msg)),
    error : msg => console.log(chalk.red(msg)),
};

module.exports = logger;

