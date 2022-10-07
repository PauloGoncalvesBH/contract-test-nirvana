"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { postClient } = require("../../src/consumer")

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("POST /client", () => {
    const requestBody = {
      firstName: "Paulo",
      lastName: "Gonçalves",
      age: 29
    }
    const expectedBody = {
      ...requestBody,
      id: 3
    }

    before (async () => {
      mockProvider
      .uponReceiving('a request to create client with firstname and lastname')
      .withRequest({
        method: "POST",
        path: "/clients",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: requestBody,
      })
      .willRespondWith({
        status: 200,
        body: Matchers.like(expectedBody),
      });
    })

    it("returns correct body, header and statusCode", async () => {
      return mockProvider.executeTest(async () => {
        const response = await postClient(requestBody)
        expect(response.data).to.deep.equal(expectedBody)
        expect(response.status).to.equal(200)
        });
    })
  })
})
