const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData } = require("../../src/provider")

const SERVER_URL = "http://localhost:8081"

server.listen(8081, () => {
    importData()
    console.log(`Clients Service listening on ${SERVER_URL}`)
  })
  
  describe("Clients Service Verification", () => {
    it("validates the expectations of Client Service", () => {
      let opts = {
        provider: "Clients Service",
        logLevel: "DEBUG",
        providerBaseUrl: SERVER_URL,
        pactUrls: ['http://localhost:8080/pacts/provider/ClientsService/consumer/Frontend/latest'],
        consumerVersionTags: ["dev"],
        providerVersionTags: ["dev"],
        publishVerificationResult: true,
        providerVersion: "1.0.1"
      }
      return new Verifier(opts).verifyProvider().then(output => {
          console.log("Pact Verification Complete!")
          console.log(output)
      })
    })
})