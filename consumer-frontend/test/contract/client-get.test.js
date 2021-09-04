"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { getClients } = require("../../src/consumer")

describe('API Pact test - Integration between \'sample-ClientsService\' and \'sample-Frontend\'', () => {
  describe("GET Clients", () => {
    it("returns correct body, header and statusCode", async () => {
      const GET_EXPECTED_BODY = [{
        "firstName": "Lisa",
        "lastName": "Simpson",
        "age": 8,
        "id": 1
      },
      {
        "firstName": "Wonder",
        "lastName": "Woman",
        "age": 30,
        "id": 2
      },
      {
        "firstName": "Homer",
        "lastName": "Simpson",
        "age": 39,
        "id": 3
      }]

      await mockProvider.addInteraction({
        state: "i have a list of clients",
        uponReceiving: "a request for all clients",
        withRequest: {
          method: "GET",
          path: "/clients",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.like(GET_EXPECTED_BODY),
        },
      })

      const response = await getClients()
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
      expect(response.data).to.deep.members(GET_EXPECTED_BODY)
      expect(response.status).to.equal(200)
    })
  })
})
