let publisher = require("@pact-foundation/pact-node")
let path = require("path")

let opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), "__tests__/contract/pacts")],
    pactBroker: "http://localhost:8080",
    consumerVersion: "1.0.1",
    providerVersion: "1.0.1",
    tags: "dev"
}

publisher.publishPacts(opts)