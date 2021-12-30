/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    // Files under these directories are linted using ESLint
    dirs: ['pages', 'lib', 'components', 'tests', 'constants'],
  },
}
