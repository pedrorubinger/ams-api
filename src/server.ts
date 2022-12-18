import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT
const host = process.env.HOST

app.use(express.json())
app.listen(port, () =>
  console.log(`[ON] Server is running at ${host} on port ${port}.`)
)
