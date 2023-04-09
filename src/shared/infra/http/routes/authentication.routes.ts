import { Router } from "express"

import { AuthenticateUserController } from "@application/modules/authentication/controllers/AuthenticateUserController"
import { ValidateTokenController } from "@application/modules/authentication/controllers/ValidateTokenController"
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated"

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
