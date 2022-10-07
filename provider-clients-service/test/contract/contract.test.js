const { Verifier } = require('@pact-foundation/pact')

const { server, clientRepository } = require("../../src/provider")
const {
  dateOneMonthAgo,
  currentGitBranch,
  currentGitHash,
  isDefaultBranch
} = require('./util')
const stateHandlers = require('./state-handlers')

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
      provider: 'clients-service',
      logLevel: 'INFO',
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      providerBaseUrl: SERVER_URL,
      providerVersionBranch: currentGitBranch,
      providerVersion: currentGitHash,
      publishVerificationResult: process.env.CI == 'true',
      verbose: false,
      timeout: 600000,
      beforeEach: () => {
        clientRepository.clear()
      },
      stateHandlers: {
        'i have a list of clients': async () => {
          stateHandlers.client.iHaveAListOfClients()
        },
        'i have client with id 123': async () => {
          stateHandlers.client.iHaveClientWithId123()
        },
      },
    }

    // For builds that were 'triggered' by 'change of contract content'
    //  webhook, you only need to check the changed contract (pact).
    // The URL (env PACT_URL) will be passed by the webhook to the CI job.
    // https://docs.pact.io/provider/recommended_configuration/#verification-triggered-by-pact-change
    const pactChangedOptions = {
      pactUrls: [process.env.PACT_URL]
    }

    const fetchPactsDynamicallyOptions = {
      pactBrokerUrl: 'https://saflow.pactflow.io',
      consumerVersionSelectors: [
        {
          mainBranch: true
        },
        {
          matchingBranch: true
        },
        {
          deployed: true
        },
      ],
      // https://docs.pact.io/pact_broker/advanced_topics/wip_pacts
      enablePending: isDefaultBranch,
      // https://docs.pact.io/pact_broker/advanced_topics/wip_pacts
      ...(isDefaultBranch
        ? {
            includeWipPactsSince: dateOneMonthAgo(),
          }
        : {})
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
