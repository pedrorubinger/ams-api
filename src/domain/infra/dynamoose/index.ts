import { DonationModel } from "@domain/infra/dynamoose/Donation"
import { PartnerModel } from "@domain/infra/dynamoose/Partner"
import { PartnerRegistrationIdModel } from "@domain/infra/dynamoose/PartnerRegistrationId"
import { TenantModel } from "@domain/infra/dynamoose/Tenant"
import { UserModel } from "@domain/infra/dynamoose/User"

export * from "@domain/infra/dynamoose/Tenant"
export * from "@domain/infra/dynamoose/User"
export * from "@domain/infra/dynamoose/Partner"
export * from "@domain/infra/dynamoose/Donation"
export * from "@domain/infra/dynamoose/PartnerRegistrationId"

export const Tables = [
  DonationModel.Model.table().name,
  PartnerModel.Model.table().name,
  PartnerRegistrationIdModel.Model.table().name,
  TenantModel.Model.table().name,
  UserModel.Model.table().name,
]
