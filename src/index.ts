import express from "express"
import cors from "cors"
import "reflect-metadata"

import "@shared/container"
import { router } from "@shared/infra/http/routes"
import * as config from "@config"

config.connectDatabase()

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(config.PORT, () => {
  const environemnt = config.STAGE === "dev" ? "development" : "production"

  console.log(
    `[ON] Server is running on port ${config.PORT} in ${environemnt} mode.`
  )
})
