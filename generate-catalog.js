const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'materiale-pubblico');
const output = path.join(__dirname, 'catalogo.json');

const parseQuiz = (filePath, relativePath) => {
  const fields = Object.fromEntries(fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(line => line.match(/^\s*(Titolo|Descrizione|Domande|Tempo|Feedback|Link)\s*:\s*(.+?)\s*$/i))
    .filter(Boolean)
    .map(([, key, value]) => [key.toLowerCase(), value]));
  if (!fields.titolo || !fields.link) return null;
  return {
    path: relativePath,
    title: fields.titolo,
    description: fields.descrizione || '',
    questions: fields.domande || '',
    duration: fields.tempo || '',
    feedback: fields.feedback || '',
    url: fields.link
  };
};

const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const absolutePath = path.join(directory, entry.name);
  if (entry.name.startsWith('.') || entry.name === '.DS_Store') return [];
  if (entry.isDirectory()) return walk(absolutePath);
  const relativePath = path.relative(__dirname, absolutePath).split(path.sep).join('/');
  const quiz = /^quiz(?:[-_].*)?\.txt$/i.test(entry.name) ? parseQuiz(absolutePath, relativePath) : null;
  return [{ type: 'blob', path: relativePath, ...(quiz ? { quiz } : {}) }];
});

const tree = walk(root).sort((first, second) => first.path.localeCompare(second.path, 'it'));
const catalog = {
  generatedAt: new Date().toISOString(),
  tree,
  quizzes: tree.filter(item => item.quiz).map(item => item.quiz)
};

fs.writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Catalogo generato: ${catalog.tree.length} file`);
