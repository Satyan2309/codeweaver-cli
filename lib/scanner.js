import fs from 'fs';
import path from 'path';
import globby from 'globby';
import chalk from 'chalk';

export async function scanProject({ project = '.', analyzeDependencies }) {
  console.log(chalk.blue(`🔍 Scanning project at ${project}`));

  const files = await globby(['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'], {
    cwd: project,
    gitignore: true
  });

  console.log(chalk.green(`📁 Total code files: ${files.length}`));

  if (analyzeDependencies) {
    const deps = new Set();
    files.forEach(file => {
      const content = fs.readFileSync(path.join(project, file), 'utf8');
      const matches = content.match(/(require|from)\s*['"](.+?)['"]/g);
      if (matches) {
        matches.forEach(m => {
          const pathMatch = m.match(/['"](.+?)['"]/);
          if (pathMatch) deps.add(pathMatch[1]);
        });
      }
    });

    console.log(chalk.yellow(`📦 Dependencies:`));
    deps.forEach(d => console.log(` - ${d}`));
  }
}
