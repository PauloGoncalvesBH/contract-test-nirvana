const { PactV3 } = require("@pact-foundation/pact")

global.mockProvider = new PactV3({
  port: 8081,
  logLevel: 'INFO',
  consumer: 'frontend',
  provider: 'clients-service',
  pactfileWriteMode: 'merge',
})
