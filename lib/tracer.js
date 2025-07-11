const fs = require('fs');
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');

async function traceVariable({ variable, acrossStack }) {
  const cwd = process.cwd();
  const files = await globby(['**/*.js', '**/*.ts', '**/*.tsx'], {
    cwd,
    gitignore: true
  });

  console.log(chalk.blue(`🔍 Tracing variable: '${variable}'`));
  let total = 0;

  files.forEach(file => {
    const content = fs.readFileSync(path.join(cwd, file), 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes(variable)) {
        total++;
        console.log(chalk.green(`🔸 ${file}:${idx + 1} → ${line.trim()}`));
      }
    });
  });

  if (!total) console.log(chalk.red('❌ Variable not found.'));
}

module.exports = { traceVariable };
