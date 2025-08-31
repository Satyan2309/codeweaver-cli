import { traceVariable } from '../lib/tracer.js';

test('tracer runs with dummy variable', async () => {
  await traceVariable({ variable: 'userId' });
});
