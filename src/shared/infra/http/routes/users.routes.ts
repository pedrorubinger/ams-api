import { Router } from "express"

import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated"
import { isAuthorized } from "@shared/infra/http/middlewares/isAuthorized"
import { CreateUserController } from "@application/modules/user/controllers/CreateUserController"
import { FindUserController } from "@application/modules/user/controllers/FindUserController"
import { GetAllUsersController } from "@application/modules/user/controllers/GetAllUsersController"
import { UpdateAccountController } from "@application/modules/user/controllers/UpdateAccountController"
import { UpdateUserController } from "@application/modules/user/controllers/UpdateUserController"
import { DeleteUserController } from "@application/modules/user/controllers/DeleteUserController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const findUserController = new FindUserController()
const getAllUsersController = new GetAllUsersController()
const updateAccountController = new UpdateAccountController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post(
  "/",
  // isAuthenticated,
  // isAuthorized({ roles: ["master"] }),
  createUserController.handle
)
usersRoutes.put(
  "/:id",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
  updateUserController.handle
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
usersRoutes.put("/", isAuthenticated, updateAccountController.handle)
usersRoutes.delete("/:id", isAuthenticated, deleteUserController.handle)

export { usersRoutes }
