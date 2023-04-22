import { container } from "tsyringe"

import {
  TenantsRepository,
  UsersRepository,
} from "@application/infra/dynamoose/repositories"
import { ITenantsRepository, IUsersRepository } from "@application/repositories"

container.registerSingleton<ITenantsRepository>(
  "TenantsRepository",
  TenantsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
