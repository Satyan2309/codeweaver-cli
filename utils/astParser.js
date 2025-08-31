import parser from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default || traverseModule;

/**
 * Parse code and extract all variable names (supports JS, TS, JSX)
 * @param {string} code - The source code to analyze
 * @returns {string[]} - Array of variable names
 */
export function extractVariables(code) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  const variables = [];

  traverse(ast, {
    VariableDeclaration(path) {
      path.node.declarations.forEach(decl => {
        if (decl.id?.type === 'Identifier') {
          variables.push(decl.id.name);
        } else if (decl.id?.type === 'ObjectPattern') {
          decl.id.properties.forEach(prop => {
            if (prop.key?.name) variables.push(prop.key.name);
          });
        } else if (decl.id?.type === 'ArrayPattern') {
          decl.id.elements.forEach(el => {
            if (el?.name) variables.push(el.name);
          });
        }
      });
    }
  });

  return variables;
}
