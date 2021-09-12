
module.exports = {
  require: [
    './test/contract/utils/startProvider.js',
    './test/contract/utils/hooks.js'
  ],
  spec: ['./test/contract/**/*.test.js'],
  timeout: 60000,
  color: true,
}
