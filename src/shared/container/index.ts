import { container } from "tsyringe"

import {
  TenantsRepository as Tenants,
  UsersRepository as Users,
  PartnersRepository as Partners,
  DonationsRepository as Donations,
  PartnerRegistrationIdsRepository as RegistrationIds,
  MetadataRepository as Metadata,
} from "@application/infra/dynamoose/repositories"
import {
  ITenantsRepository as ITenants,
  IUsersRepository as IUsers,
  IPartnersRepository as IPartners,
  IDonationsRepository as IDonations,
  IPartnerRegistrationIdsRepository as IRegistrationIds,
  IMetadataRepository as IMetadata,
} from "@application/repositories"

container.registerSingleton<ITenants>("TenantsRepository", Tenants)
container.registerSingleton<IUsers>("UsersRepository", Users)
container.registerSingleton<IPartners>("PartnersRepository", Partners)
container.registerSingleton<IDonations>("DonationsRepository", Donations)
container.registerSingleton<IRegistrationIds>(
  "RegistrationIdsRepository",
  RegistrationIds
)
container.registerSingleton<IMetadata>("MetadataRepository", Metadata)
