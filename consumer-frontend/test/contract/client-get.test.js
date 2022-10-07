"use strict"

const { expect } = require('chai')
const { Matchers } = require("@pact-foundation/pact")

const { getClient, getClients } = require("../../src/consumer")

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  describe("GET /clients", () => {
    const expectedBody = {
      firstName: 'Lisa',
      lastName: 'Simpson',
      age: 8,
      id: 1
    }

    before (async () => {
      mockProvider
      .given('i have a list of client')
      .uponReceiving('a request for all clients')
      .withRequest({
        method: "GET",
        path: "/clients",
        headers: {
          Accept: "application/json",
        },
      })
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: Matchers.eachLike(expectedBody),
      });
    })

    it("returns correct body, header and statusCode", async () => {
      return mockProvider.executeTest(async () => {
        const response = await getClients()
        expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
        expect(response.data).to.deep.equal([expectedBody])
        expect(response.status).to.equal(200)
        });
    })
  })

  describe("GET /clients/:id", () => {
    const expectedBody = {
      firstName: 'Paulo',
      lastName: 'Gonçalves',
      age: 25,
      id: 123,
    }

    before (async () => {
      mockProvider
      .given('i have client with id 123')
      .uponReceiving('a request for client with id 123')
      .withRequest({
        method: "GET",
        path: "/clients/123",
        headers: {
          Accept: "application/json",
        },
      })
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: Matchers.like(expectedBody),
      });
    })

    it("returns correct body, header and statusCode", async () => {
      return mockProvider.executeTest(async () => {
        const response = await getClient(123)
        expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
        expect(response.data).to.deep.equal(expectedBody)
        expect(response.status).to.equal(200)
        });
    })    
  })
})
