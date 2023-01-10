import { Router } from "express"

import { CreateUserController } from "@application/modules/user/controllers/CreateUserController"
import { FindUserController } from "@application/modules/user/controllers/FindUserController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const findUserController = new FindUserController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.get("/:id", findUserController.handle)

export { usersRoutes }
