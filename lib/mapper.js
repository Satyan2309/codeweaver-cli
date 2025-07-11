const fs = require('fs');
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');

async function mapConnections({ frontend, backend }) {
  console.log(chalk.blue(`🔗 Mapping frontend (${frontend}) to backend (${backend})`));

  const frontendFiles = await globby(['**/*.js', '**/*.ts', '**/*.tsx'], {
    cwd: frontend,
    gitignore: true
  });

  const backendFiles = await globby(['**/*.js', '**/*.ts'], {
    cwd: backend,
    gitignore: true
  });

  const endpoints = new Set();
  backendFiles.forEach(file => {
    const content = fs.readFileSync(path.join(backend, file), 'utf-8');
    const routes = content.match(/app\.(get|post|put|delete)\(['"`](.*?)['"`]/g);
    routes?.forEach(route => {
      const match = route.match(/['"`](.*?)['"`]/);
      if (match) endpoints.add(match[1]);
    });
  });

  console.log(chalk.yellow(`🛠️ Endpoints:`));
  endpoints.forEach(e => console.log(` - ${e}`));

  frontendFiles.forEach(file => {
    const content = fs.readFileSync(path.join(frontend, file), 'utf-8');
    endpoints.forEach(endpoint => {
      if (content.includes(endpoint)) {
        console.log(`✅ ${file} → ${endpoint}`);
      }
    });
  });
}

module.exports = { mapConnections };
