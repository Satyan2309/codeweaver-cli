import fs from 'fs';
import path from 'path';
import globby from 'globby';
import chalk from 'chalk';
import { extractVariables } from '../utils/astParser.js';

export async function traceVariable({ variable }) {
  const cwd = process.cwd();
  const files = await globby(['**/*.js', '**/*.ts', '**/*.tsx'], { cwd, gitignore: true });

  console.log(chalk.blue(`🔍 Tracing variable: '${variable}'`));
  let total = 0;

  for (const file of files) {
    const content = fs.readFileSync(path.join(cwd, file), 'utf-8');
    const vars = extractVariables(content);
    if (vars.includes(variable)) {
      total++;
      console.log(chalk.green(`🔸 ${file} → ${variable}`));
    }
  }

  if (!total) console.log(chalk.red('❌ Variable not found.'));
}
