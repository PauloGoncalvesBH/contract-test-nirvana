
exports.mochaHooks = {
  async beforeAll() {
    await mockProvider.setup()
  },
  async afterEach() {
    await mockProvider.verify()
  },
  async afterAll() {
    await mockProvider.finalize()
  },
}
