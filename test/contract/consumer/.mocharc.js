
module.exports = {
  require: [ // importa antes de rodar os testes
    './test/contract/consumer/utils/startProvider.js',
    './test/contract/consumer/utils/hooks.js'
  ],
  spec: ['./test/contract/consumer/*.test.js'], // testes que vão rodar
  timeout: 60000,
  color: true,
}
