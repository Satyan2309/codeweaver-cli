import { mapConnections } from '../lib/mapper.js';

test('mapper runs with dummy paths', async () => {
  await mapConnections({ frontend: 'src', backend: 'api' });
});
