import { scanProject } from '../lib/scanner.js';

test('scanner runs without crashing', async () => {
  await scanProject({ project: '.', analyzeDependencies: false });
});
