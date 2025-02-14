import { container } from "tsyringe"

import {
  TenantsRepository as Tenants,
  UsersRepository as Users,
  PartnersRepository as Partners,
  DonationsRepository as Donations,
  PartnerRegistrationIdsRepository as RegistrationIds,
} from "@application/infra/dynamoose/repositories"
import {
  ITenantsRepository as ITenants,
  IUsersRepository as IUsers,
  IPartnersRepository as IPartners,
  IDonationsRepository as IDonations,
  IPartnerRegistrationIdsRepository as IRegistrationIds,
} from "@application/repositories"

container.registerSingleton<ITenants>("TenantsRepository", Tenants)
container.registerSingleton<IUsers>("UsersRepository", Users)
container.registerSingleton<IPartners>("PartnersRepository", Partners)
container.registerSingleton<IDonations>("DonationsRepository", Donations)
container.registerSingleton<IRegistrationIds>(
  "RegistrationIdsRepository",
  RegistrationIds
)
