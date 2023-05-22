import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import {
  CreatePartnerController,
  UpdatePartnerController,
} from "@application/modules/partner"

const partnersRoutes = Router()

const createPartnerController = new CreatePartnerController()
const updatePartnerController = new UpdatePartnerController()

partnersRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  createPartnerController.handle
)
partnersRoutes.put(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  updatePartnerController.handle
)

export { partnersRoutes }
