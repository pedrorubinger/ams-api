import { container } from "tsyringe"

import { TenantsRepository } from "@application/infra/dynamoose/repositories/TenantsRepository"
import { ITenantsRepository } from "@application/repositories/ITenantsRepository"
import { IUsersRepository } from "@application/repositories/IUsersRepository"
import { UsersRepository } from "@application/infra/dynamoose/repositories/UsersRepository"

container.registerSingleton<ITenantsRepository>(
  "TenantsRepository",
  TenantsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
