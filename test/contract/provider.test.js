const { Verifier } = require('@pact-foundation/pact')
const path = require("path")

const { server, importData } = require("../../provider-clients-service/src/provider")

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
      logLevel: 'INFO',
      providerBaseUrl: SERVER_URL,
      verbose: false,
      pactUrls: [
        path.resolve(
          process.cwd(),
          "pacts/frontend-clients-service.json"
        ),
      ],
    }

    return new Verifier(baseOptions)
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
