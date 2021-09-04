const { Pact } = require("@pact-foundation/pact")

global.mockProvider = new Pact({
  port: 8081,
  logLevel: 'INFO',
  consumer: 'sample-Frontend',
  provider: 'sample-ClientsService',
  pactfileWriteMode: 'merge',
})
