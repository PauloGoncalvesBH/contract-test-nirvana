const { Verifier } = require('@pact-foundation/pact')
const path = require("path")

const { server, clientRepository } = require("../../src/provider")
// const {
//   dateOneMonthAgo,
//   currentGitBranch,
//   currentGitHash,
//   isDefaultBranch
// } = require('./util')
// const stateHandlers = require('./state-handlers')

describe("Clients Service Verification", () => {
  const PORT = 3001
  const SERVER_URL = `http://localhost:${PORT}`

  before(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on ${SERVER_URL}`)
    })
  })

  it("validates the expectations of Client Service", () => {
    const baseOptions = {
      // provider: 'app-clients-service',
      logLevel: 'INFO',
      // pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      providerBaseUrl: SERVER_URL,
      // providerVersionTags: currentGitBranch,
      // providerVersion: currentGitHash,
      // publishVerificationResult: process.env.CI == 'true',
      verbose: false,
      timeout: 600000,
    }

    // Para builds que foram 'trigados' por webhook de 'mudança de conteúdo de contrato'
    //  é preciso verificar apenas o contrato (pact) alterado.
    // A URL (env PACT_URL) será passada pelo webhook para o job de CI.
    // https://docs.pact.io/provider/recommended_configuration/#verification-triggered-by-pact-change
    /*
    const pactChangedOptions = {
      pactUrls: [process.env.PACT_URL]
    }
    */

    /*
    const fetchPactsDynamicallyOptions = {
      pactBrokerUrl: 'https://paulogoncalves.pactflow.io',
      consumerVersionSelectors: [
        {
          tag: currentGitBranch,
          fallbackTag: 'main',
          latest: true
        },
        {
          tag: 'production',
          latest: true
        }
      ],
      // https://docs.pact.io/pact_broker/advanced_topics/pending_pacts
      includeWipPactsSince: isDefaultBranch ? dateOneMonthAgo() : undefined,
      // https://docs.pact.io/pact_broker/advanced_topics/wip_pacts
      enablePending: isDefaultBranch
    }
    */

    return new Verifier({
        ...baseOptions,
        // ...(process.env.PACT_URL ? pactChangedOptions : fetchPactsDynamicallyOptions)
        pactUrls: [
          path.resolve(
            process.cwd(),
            "../consumer-frontend/pacts/app-frontend-app-clients-service.json"
          ),
        ],
      })
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
