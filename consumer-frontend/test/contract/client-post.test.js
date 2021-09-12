"use strict"

const axios = require('axios')
const { expect } = require('chai')
const { Matchers, Pact } = require("@pact-foundation/pact")

const port = 8085
const mockProvider = new Pact({
  port,
  logLevel: 'INFO',
  consumer: 'app-frontend',
  provider: 'app-clients-service',
})

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {

  before(() => mockProvider.setup())
  afterEach(() => mockProvider.verify())
  after(() => mockProvider.finalize())

  describe("POST /client", () => {
    const requestBody = {
      
    }
    const expectedBody = {
      
    }

    before (async () => {
      await mockProvider.addInteraction({
        
      })
    })

    it("returns correct body, header and statusCode", async () => {
      
    })
  })
})
