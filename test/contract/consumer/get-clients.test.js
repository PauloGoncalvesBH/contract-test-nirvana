"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { getClients } = require("../../../consumer-frontend/src/consumer")

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("GET /clients", () => {
    const expectedBody = {
      firstName: 'Lisa',
      lastName: 'Simpson',
      age: 8,
      id: 1
    }

    before (async () => {
      await mockProvider.addInteraction({
        state: "i have a list of clients", // setup, pré-requisito
        uponReceiving: "a request for all clients", // o que a request vai fazer?
        withRequest: { // definição da API que o mock do provider vai disponibilizar
          method: "GET",
          path: "/clients",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: { // resposta que a API do mock do provider vai retornar
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.eachLike(expectedBody),
        },
      })
    })

      
    it("returns correct body, header and statusCode", async () => {
      const response = await getClients() // request GET /clients na porta 8081 (do provider)
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
      expect(response.data).to.deep.equal([expectedBody])
      expect(response.status).to.equal(200)
    })
  })
})
