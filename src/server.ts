import express from "express"

import { HOST, PORT } from "@config"

const app = express()

app.use(express.json())
app.listen(PORT, () => console.log(`[ON] Server is running at ${HOST}:${PORT}`))
