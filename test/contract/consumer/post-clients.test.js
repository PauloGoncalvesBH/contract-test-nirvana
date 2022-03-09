"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { postClient } = require("../../../consumer-frontend/src/consumer")

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("POST /clients", () => {
    const requestBody = {
      firstName: 'Lisa',
      lastName: 'Simpson',
      age: 8,
    }

    const expectedBody = {
      ...requestBody, // spread operator
      id: 1,
    }

    before (async () => {
      await mockProvider.addInteraction({
        uponReceiving: "a request for add clients", // o que a request vai fazer?
        withRequest: { // definição da API que o mock do provider vai disponibilizar
          method: "POST",
          path: "/clients",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: requestBody
        },
        willRespondWith: { // resposta que a API do mock do provider vai retornar
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.like(expectedBody),
        },
      })
    }) // each = array

    it("returns correct body, header and statusCode", async () => {
      const response = await postClient(requestBody) // request GET /clients na porta 8081 (do provider)
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
      expect(response.data).to.deep.equal(expectedBody)
      expect(response.status).to.equal(200)
    })
  })
})
