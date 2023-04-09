import { Router } from "express"

import { tenantsRoutes } from "@shared/infra/http/routes/tenants.routes"
import { usersRoutes } from "@shared/infra/http/routes/users.routes"
import { authenticationRoutes } from "@shared/infra/http/routes/authentication.routes"

const router = Router()

router.use("/tenants", tenantsRoutes)
router.use("/users", usersRoutes)
router.use("/sessions", authenticationRoutes)

export { router }
