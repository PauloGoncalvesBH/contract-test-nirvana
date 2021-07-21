const { Verifier } = require('@pact-foundation/pact')
const path = require("path")

const { server, importData } = require("../../provider-clients-service/src/provider")

describe("Clients Service Verification", () => {
  before(() => {

  })

  it("validates the expectations of Client Service", () => {
    return new Verifier({
        
      })
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
