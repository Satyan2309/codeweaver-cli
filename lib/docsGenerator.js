import fs from 'fs';
import chalk from 'chalk';

export async function generateDocs({ output = 'API_DOC.md' }) {
  const docContent = `
## 🔗 Endpoint: /api/users/:id

- Method: GET
- Used in: UserProfile.tsx
- Expects: { userId: string }
- Returns: { first_name: string, last_name: string }

⚠️ Mismatch: Frontend expects \`firstName\`, API returns \`first_name\`
`;

  fs.writeFileSync(output, docContent.trim());
  console.log(chalk.green(`📄 API integration documentation written to ${output}`));
}

