const express = require("express")
const path = require("path")
const app = express()

// app.get("/", (req, res) => {
//     res.json({ message: "Let's play tic-tac-toe!" })
// })

const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname + "/public")))

app.use((req, res) => {
    res.status(404)
    res.send("<h1>Error 404</h1><div>Resource not found</div>")
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
