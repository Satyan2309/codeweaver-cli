const { mapConnections } = require('../lib/mapper');

test('mapper runs with dummy paths', async () => {
  await mapConnections({ frontend: 'src', backend: 'api' });
});
