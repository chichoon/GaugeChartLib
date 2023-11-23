import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

function main() {
  const source = fs.readFileSync(__dirname + '/package.json').toString('utf-8');
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  if (sourceObj.main.startsWith('/dist/')) {
    sourceObj.main = sourceObj.main.slice(5);
  }
  fs.writeFileSync(
    __dirname + '/dist/package.json',
    Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8')
  );
  fs.writeFileSync(__dirname + '/dist/version.txt', Buffer.from(sourceObj.version, 'utf-8'));

  if (fs.existsSync(__dirname + '/.npmignore'))
    fs.copyFileSync(__dirname + '/.npmignore', __dirname + '/dist/.npmignore');
}

main();
