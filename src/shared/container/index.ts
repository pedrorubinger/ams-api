import { container } from "tsyringe"

import { TenantsRepository } from "@application/infra/dynamoose/repositories/TenantsRepository"
import { ITenantsRepository } from "@application/repositories/ITenantsRepository"

container.registerSingleton<ITenantsRepository>(
  "TenantsRepository",
  TenantsRepository
)
