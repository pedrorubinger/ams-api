import { Router } from "express"

import {
  AuthenticateUserController,
  ValidateTokenController,
} from "@application/modules/authentication/controllers"
import { isAuthenticated } from "@shared/infra/http/middlewares"

const authenticationRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const validateTokenController = new ValidateTokenController()

authenticationRoutes.post("/", authenticateUserController.handle)
authenticationRoutes.get(
  "/validate",
  isAuthenticated,
  validateTokenController.handle
)

export { authenticationRoutes }
