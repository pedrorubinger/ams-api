import { Router } from "express"

import { CreateTenantController } from "@application/modules/tenant/controllers/CreateTenantController"
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated"
import { isAuthorized } from "@shared/infra/http/middlewares/isAuthorized"
import { GetAllTenantsController } from "@application/modules/tenant/controllers/GetAllTenantsController"

const tenantsRoutes = Router()

const createTenantController = new CreateTenantController()
const getAllTenantsController = new GetAllTenantsController()

tenantsRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  createTenantController.handle
)
tenantsRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  getAllTenantsController.handle
)

export { tenantsRoutes }
