"use strict"

const { expect } = require('chai')
const { Matchers, Pact } = require("@pact-foundation/pact")

const { getClients, postClient } = require("../../src/consumer")

const mockProvider = new Pact({
  port: 8081,
  logLevel: 'INFO',
  consumer: 'sample-Frontend',
  provider: 'sample-ClientsService',
});

describe('API Pact test - Integration between \'sample-ClientsService\' and \'sample-Frontend\'', () => {
  before(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  after(() => mockProvider.finalize());

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