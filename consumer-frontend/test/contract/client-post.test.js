"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { postClient } = require("../../src/consumer")

describe('API Pact test - Integration between \'sample-ClientsService\' and \'sample-Frontend\'', () => {
  describe("POST Client", () => {
    it("returns correct body, header and statusCode", async () => {
      const POST_BODY = {
        firstName: "Paulo",
        lastName: "Gonçalves",
        age: 29
      }

      await mockProvider.addInteraction({
        state: "i create a new client",
        uponReceiving: "a request to create client with firstname and lastname",
        withRequest: {
          method: "POST",
          path: "/clients",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: POST_BODY,
        },
        willRespondWith: {
          status: 200,
          body: Matchers.like({
            ...POST_BODY,
            id: 3
          }).contents,
        },
      })

      const response = await postClient(POST_BODY)
      expect(response.data.id).to.equal(3)
      expect(response.status).to.equal(200)
    })
  })
})
