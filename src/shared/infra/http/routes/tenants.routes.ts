import { Router } from "express"

import { CreateTenantController } from "@application/modules/tenant/controllers/CreateTenantController"
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated"
import { isAuthorized } from "@shared/infra/http/middlewares/isAuthorized"

const tenantsRoutes = Router()

const createTenantController = new CreateTenantController()

tenantsRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  createTenantController.handle
)

export { tenantsRoutes }
