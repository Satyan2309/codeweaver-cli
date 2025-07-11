const { traceVariable } = require('../lib/tracer');

test('tracer runs with dummy variable', async () => {
  await traceVariable({ variable: 'userId' });
});
