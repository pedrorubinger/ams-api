import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import {
  CreateUserController,
  FindUserController,
  GetAllUsersController,
  UpdateAccountController,
  UpdateUserController,
  DeleteUserController,
} from "@application/modules/user"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const findUserController = new FindUserController()
const getAllUsersController = new GetAllUsersController()
const updateAccountController = new UpdateAccountController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["master"] }),
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
