"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { getClient } = require("../../../consumer-frontend/src/consumer")

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("GET /clients/id", () => {
    const expectedBody = {
      firstName: 'Wonder',
      lastName: 'Woman',
      age: 30,
      id: 2
    }

    before (async () => {
      await mockProvider.addInteraction({
        state: "i have a list of one client", // setup, pré-requisito
        uponReceiving: "a request for one client", // o que a request vai fazer?
        withRequest: { // definição da API que o mock do provider vai disponibilizar
          method: "GET",
          path: "/clients/2",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: { // resposta que a API do mock do provider vai retornar
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.like(expectedBody),
        },
      })
    })

    it("returns correct body, header and statusCode", async () => {
      const response = await getClient(2) // request GET /clients na porta 8081 (do provider)
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
      expect(response.data).to.deep.equal(expectedBody)
      expect(response.status).to.equal(200)
    })
  })
})
