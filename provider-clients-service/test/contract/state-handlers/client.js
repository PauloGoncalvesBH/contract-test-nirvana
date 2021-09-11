const { importData, clientRepository } = require("../../../src/provider")

// GET /clients
function iHaveAListOfClients () {
  importData()
}

// GET /clients/123
function iHaveClientWithId123 () {
  clientRepository.add({
    firstName: 'Paulo',
    lastName: 'Gonçalves',
    age: 25,
    id: 123,
  })
}

module.exports = {
  iHaveAListOfClients,
  iHaveClientWithId123,
}
