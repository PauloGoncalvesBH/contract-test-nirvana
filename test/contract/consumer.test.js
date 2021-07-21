"use strict"

const { expect } = require('chai')
const { Pact } = require("@pact-foundation/pact")

const { getClient } = require("../../consumer-frontend/src/consumer")

const mockProvider = new Pact({});

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  before(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  after(() => mockProvider.finalize());

  describe("", () => {
    it("", async () => {
      await mockProvider.addInteraction({})

      const response = await
      expect().to.equal()
    })
  })
})
