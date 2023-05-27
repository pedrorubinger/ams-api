import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import { CreateDonationController } from "@application/modules/donation"

const donationsRoutes = Router()

const createDonationController = new CreateDonationController()

donationsRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  createDonationController.handle
)

export { donationsRoutes }
