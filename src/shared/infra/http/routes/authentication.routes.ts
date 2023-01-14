import { Router } from "express"

import { AuthenticateUserController } from "@application/modules/authentication/controllers/AuthenticateUserController"

const authenticationRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticationRoutes.post("/", authenticateUserController.handle)

export { authenticationRoutes }
