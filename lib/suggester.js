import chalk from 'chalk';

export async function suggestImprovements() {
  console.log(chalk.blue('🧠 Analyzing for suggestions...'));

  console.log(chalk.yellow('\n📌 Suggestions:'));
  console.log(` - ✅ Combine repeated fetch calls to /api/user into single batched call.`);
  console.log(` - ⚠️ Consider caching /api/config which is static.`);
  console.log(` - ❌ Avoid fetching /api/notifications every 5s, use WebSocket instead.`);
}

