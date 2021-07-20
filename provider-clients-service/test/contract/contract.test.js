const { Verifier } = require('@pact-foundation/pact')

const { server, importData } = require("../../src/provider")
const {
  dateOneMonthAgo,
  currentGitBranch,
  currentGitHash,
  isDefaultBranch
} = require('./util')

describe("Clients Service Verification", () => {
  const PORT = 3001
  const SERVER_URL = `http://localhost:${PORT}`

  before(() => {
    server.listen(PORT, () => {
      importData()
      console.log(`Server listening on ${SERVER_URL}`)
    })
  })

  it("validates the expectations of Client Service", () => {
    const baseOptions = {
      provider: 'sample-ClientsService',
      logLevel: 'INFO',
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      providerBaseUrl: SERVER_URL,
      providerVersionTags: currentGitBranch,
      providerVersion: currentGitHash,
      publishVerificationResult: process.env.CI == 'true',
      verbose: false
    }

    // Para builds que foram 'trigados' por webhook de 'mudança de conteúdo de contrato'
    //  é preciso verificar apenas o contrato (pact) alterado.
    // A URL (env PACT_URL) será passada pelo webhook para o job de CI.
    // https://docs.pact.io/provider/recommended_configuration/#verification-triggered-by-pact-change
    const pactChangedOptions = {
      pactUrls: [process.env.PACT_URL]
    }

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
      includeWipPactsSince: isDefaultBranch ? dateOneMonthAgo() : undefined,
      enablePending: isDefaultBranch
    }

    return new Verifier({
        ...baseOptions,
        ...(process.env.PACT_URL ? pactChangedOptions : fetchPactsDynamicallyOptions)
      })
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
