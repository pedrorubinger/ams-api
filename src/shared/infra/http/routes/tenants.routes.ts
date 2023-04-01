import { Router } from "express"

import { CreateTenantController } from "@application/modules/tenant/controllers/CreateTenantController"
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated"
import { isAuthorized } from "@shared/infra/http/middlewares/isAuthorized"
import { GetAllTenantsController } from "@application/modules/tenant/controllers/GetAllTenantsController"
import { UpdateTenantController } from "@application/modules/tenant/controllers/UpdateTenantController"

const tenantsRoutes = Router()

const createTenantController = new CreateTenantController()
const updateTenantController = new UpdateTenantController()
const getAllTenantsController = new GetAllTenantsController()

tenantsRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  createTenantController.handle
)
tenantsRoutes.put(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  updateTenantController.handle
)
tenantsRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  getAllTenantsController.handle
)

export { tenantsRoutes }
