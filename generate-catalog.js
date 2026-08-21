const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'materiale-pubblico');
const output = path.join(__dirname, 'catalogo.json');

const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const absolutePath = path.join(directory, entry.name);
  if (entry.name.startsWith('.') || entry.name === '.DS_Store') return [];
  if (entry.isDirectory()) return walk(absolutePath);
  return [{ type: 'blob', path: path.relative(__dirname, absolutePath).split(path.sep).join('/') }];
});

const catalog = {
  generatedAt: new Date().toISOString(),
  tree: walk(root).sort((first, second) => first.path.localeCompare(second.path, 'it'))
};

fs.writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Catalogo generato: ${catalog.tree.length} file`);
