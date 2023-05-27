import { Router } from "express"

import { tenantsRoutes } from "@shared/infra/http/routes/tenants.routes"
import { usersRoutes } from "@shared/infra/http/routes/users.routes"
import { authenticationRoutes } from "@shared/infra/http/routes/authentication.routes"
import { partnersRoutes } from "@shared/infra/http/routes/partners.routes"
import { donationsRoutes } from "@shared/infra/http/routes/donations.routes"

const router = Router()

router.use("/tenants", tenantsRoutes)
router.use("/users", usersRoutes)
router.use("/sessions", authenticationRoutes)
router.use("/partners", partnersRoutes)
router.use("/donations", donationsRoutes)

export { router }
