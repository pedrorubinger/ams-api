import { Router } from "express"

import { tenantsRoutes } from "@shared/infra/http/routes/tenants.routes"

const router = Router()

router.use("/tenants", tenantsRoutes)

export { router }
