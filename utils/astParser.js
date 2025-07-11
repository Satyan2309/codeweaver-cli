const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function extractVariables(code){
     const ast = parser.parse(code,{
        sourceType :'module',
        plugins:['typescript','jsx']
     });


     const variables = [];

     traverse(ast,{
        VariableDeclaration(path){
            variables.push(path.node.id.name);      
        }
     });

     return variables;

}

module.exports = { extractVariables };