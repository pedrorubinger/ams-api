import { Router } from "express"

import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated"
import { isAuthorized } from "@shared/infra/http/middlewares/isAuthorized"
import { CreateUserController } from "@application/modules/user/controllers/CreateUserController"
import { FindUserController } from "@application/modules/user/controllers/FindUserController"
import { GetAllUsersController } from "@application/modules/user/controllers/GetAllUsersController"
import { UpdateUserController } from "@application/modules/user/controllers/UpdateUserController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const findUserController = new FindUserController()
const getAllUsersController = new GetAllUsersController()
const updateUserController = new UpdateUserController()

usersRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  createUserController.handle
)
usersRoutes.get(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  findUserController.handle
)
usersRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  getAllUsersController.handle
)
usersRoutes.put("/", isAuthenticated, updateUserController.handle)

export { usersRoutes }
