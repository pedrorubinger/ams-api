import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import {
  CreatePartnerController,
  UpdatePartnerController,
} from "@application/modules/partner"
import {
  DeletePartnerController,
  FindPartnerController,
  GetAllPartnersController,
} from "@application/modules/partner/controllers"

const partnersRoutes = Router()

const createPartnerController = new CreatePartnerController()
const updatePartnerController = new UpdatePartnerController()
const findPartnerController = new FindPartnerController()
const getAllPartnersController = new GetAllPartnersController()
const deletePartnerController = new DeletePartnerController()

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
partnersRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  findPartnerController.handle
)
partnersRoutes.delete(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  deletePartnerController.handle
)
partnersRoutes.get(
  "/all",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  getAllPartnersController.handle
)

export { partnersRoutes }
