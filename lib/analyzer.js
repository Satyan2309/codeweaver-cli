import fs from 'fs';
import path from 'path';
import globby from 'globby';
import chalk from 'chalk';

function normalize(field) {
  return field.toLowerCase().replace(/_|-/g, '');
}

function extractInterfaceFields(content) {
  const interfaceRegex = /(interface|type)\s+\w+\s*{([^}]+)}/g;
  const fields = new Set();

  let match;
  while ((match = interfaceRegex.exec(content)) !== null) {
    const body = match[2];
    const lines = body.split('\n');
    lines.forEach(line => {
      const fieldMatch = line.trim().match(/^([a-zA-Z0-9_]+)\??:\s*([a-zA-Z0-9_\[\]]+)/);
      if (fieldMatch) fields.add(fieldMatch[1]);
    });
  }

  return fields;
}

function extractResJsonFields(content) {
  const fields = new Set();
  const matches = content.match(/res\.json\s*\(\s*{[^}]+}\s*\)/gs);
  matches?.forEach(match => {
    const fieldMatch = match.match(/['"`]?([a-zA-Z0-9_]+)['"`]?\s*:/g);
    fieldMatch?.forEach(f => fields.add(f.replace(/['"`:\s]/g, '')));
  });
  return fields;
}

export async function analyzeContracts({ frontend = 'src', backend = 'api' }) {
  console.log(chalk.blue(`📊 Analyzing contracts between ${frontend} and ${backend}`));

  const frontendFiles = await globby(['**/*.ts', '**/*.tsx'], { cwd: frontend });
  const backendFiles = await globby(['**/*.js', '**/*.ts'], { cwd: backend });

  const frontendFields = new Set();
  const backendFields = new Set();

  frontendFiles.forEach(file => {
    const content = fs.readFileSync(path.join(frontend, file), 'utf8');
    extractInterfaceFields(content).forEach(f => frontendFields.add(f));
  });

  backendFiles.forEach(file => {
    const content = fs.readFileSync(path.join(backend, file), 'utf8');
    extractResJsonFields(content).forEach(f => backendFields.add(f));
  });

  console.log(chalk.yellow(`\n🔎 Backend responds with:`));
  backendFields.forEach(f => console.log(` - ${f}`));

  console.log(chalk.cyan(`\n💻 Frontend TS interfaces expect:`));
  frontendFields.forEach(f => console.log(` - ${f}`));

  const mismatches = [...frontendFields].filter(front =>
    ![...backendFields].some(back => normalize(back) === normalize(front))
  );

  if (mismatches.length) {
    console.log(chalk.red(`\n❌ Contract Mismatches:`));
    mismatches.forEach(f =>
      console.log(` ⚠️  Frontend expects '${f}' but backend does not return a matching key`)
    );
  } else {
    console.log(chalk.green(`\n✅ All interface fields match backend responses.`));
  }
}
