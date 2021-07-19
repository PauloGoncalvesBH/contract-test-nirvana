const { server } = require("./consumer")

server.listen(8080, () => {
  console.log("Frontend running on http://localhost:8080")
})