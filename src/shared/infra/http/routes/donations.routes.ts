import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import {
  CreateDonationController,
  DeleteDonationController,
  GetAllDonationsController,
} from "@application/modules/donation"

const donationsRoutes = Router()

const createDonationController = new CreateDonationController()
const getAllDonationsController = new GetAllDonationsController()
const deleteDonationController = new DeleteDonationController()

donationsRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  createDonationController.handle
)
donationsRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  getAllDonationsController.handle
)
donationsRoutes.delete(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  deleteDonationController.handle
)

export { donationsRoutes }
