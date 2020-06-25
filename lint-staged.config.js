const lintJS = ['prettier --write', 'eslint --fix --color -f table', 'git add'];
const lintTS = ['prettier --write', 'eslint --fix --color -f table', 'git add'];
const onlyPrettier = ['prettier --write', 'git add'];
const yarnDeduplicate = ['yarn-deduplicate', 'git add'];

module.exports = {
  'src/**/*.js': lintJS,
  'src/**/*.jsx': lintJS,
  'src/**/*.ts': lintTS,
  'src/**/*.tsx': lintTS,
  'src/**/*.scss': onlyPrettier,
  'src/**/*.css': onlyPrettier,
  'pages/**/*.js': lintJS,
  'pages/**/*.jsx': lintJS,
  'pages/**/*.ts': lintTS,
  'pages/**/*.tsx': lintTS,
  'pages/**/*.scss': onlyPrettier,
  'pages/**/*.css': onlyPrettier
};
