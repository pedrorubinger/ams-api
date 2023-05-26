import { container } from "tsyringe"

import {
  PartnersRepository as Partners,
  TenantsRepository as Tenants,
  UsersRepository as Users,
} from "@application/infra/dynamoose/repositories"
import {
  IPartnersRepository,
  ITenantsRepository,
  IUsersRepository,
} from "@application/repositories"

container.registerSingleton<ITenantsRepository>("TenantsRepository", Tenants)
container.registerSingleton<IUsersRepository>("UsersRepository", Users)
container.registerSingleton<IPartnersRepository>("PartnersRepository", Partners)
