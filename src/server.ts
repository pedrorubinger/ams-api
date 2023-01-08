import express from "express"
import "reflect-metadata"

import "@shared/container"
import { router } from "@shared/infra/http/routes"
import * as config from "@config"

config.connectDatabase()

const app = express()

app.use(express.json())
app.use(router)

app.listen(config.PORT, () =>
  console.log(`[ON] Server is running at ${config.HOST}:${config.PORT}`)
)
