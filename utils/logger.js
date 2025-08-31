import chalk from 'chalk';

const logger = {
  info: msg => console.log(chalk.blue(msg)),
  success: msg => console.log(chalk.green(msg)),
  warn: msg => console.log(chalk.yellow(msg)),
  error: msg => console.log(chalk.red(msg)),
};

export default logger;
