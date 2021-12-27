module.exports = {
  // Lint all the staged files using Next (ESLint)
  '**/*.ts?(x)': (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`,
  // Prettify the linted files using Prettier
  '**/*.{js,ts,tsx,json,css,md}"': 'prettier --write',
}
