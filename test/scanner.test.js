const {scanProject } = require('../lib/scanner');

test('scanner runs without crashing', async() => {
    await scanProject({project: '.', analyzeDependencies: false});
});