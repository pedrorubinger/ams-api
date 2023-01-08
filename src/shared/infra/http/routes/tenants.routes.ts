import { Router } from "express"

import { CreateTenantController } from "@application/modules/tenant/controllers/CreateTenantController"

const tenantsRoutes = Router()

const createTenantController = new CreateTenantController()

tenantsRoutes.post("/", createTenantController.handle)

export { tenantsRoutes }
