const express = require("express")
const cors = require("cors")
const { ValidationError } = require('express-validation')

const Repository = require("./repository")
const { validatePostSchema } = require('./schema')

const server = express()
server.use(cors())
server.use(express.json())
server.use(
  express.urlencoded({
    extended: true,
  })
)
server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})

const clientRepository = new Repository()

// Load client data into a repository object
const importData = () => {
  const data = require("./data/clientData.json")
  data.reduce((a, v) => {
    v.id = a + 1
    clientRepository.add(v)
    return a + 1
  }, 0)
}

// Get all clients
server.get("/clients", (req, res) => {
  res.json(clientRepository.fetchAll())
})

// Find client by ID
server.get("/clients/:id", (req, res) => {
  const response = clientRepository.getById(req.params.id)
  if (response) {
    res.end(JSON.stringify(response))
  } else {
    res.status(404)
    res.send({message: 'Client not found!'})
    res.end()
  }
})

// Add a new Client
server.post("/clients", validatePostSchema(), (req, res) => {
  const client = req.body
  client.id = clientRepository.fetchAll().length
  clientRepository.add(client)

  res.json(client)
})

server.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  next()
})

module.exports = {
  server,
  importData,
  clientRepository,
}
