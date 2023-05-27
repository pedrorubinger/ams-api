import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import {
  CreateDonationController,
  GetAllDonationsController,
} from "@application/modules/donation"

const donationsRoutes = Router()

const createDonationController = new CreateDonationController()
const getAllDonationsController = new GetAllDonationsController()

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

export { donationsRoutes }
