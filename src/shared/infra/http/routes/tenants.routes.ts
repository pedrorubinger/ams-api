import { Router } from "express"

import {
  CreateTenantController,
  GetAllTenantsController,
  UpdateTenantController,
  DeleteTenantController,
} from "@application/modules/tenant"
import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"

const tenantsRoutes = Router()

const createTenantController = new CreateTenantController()
const updateTenantController = new UpdateTenantController()
const deleteTenantController = new DeleteTenantController()
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
tenantsRoutes.delete(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  deleteTenantController.handle
)
tenantsRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  getAllTenantsController.handle
)

export { tenantsRoutes }
