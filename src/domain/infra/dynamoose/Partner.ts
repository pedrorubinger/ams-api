import * as dynamoose from "dynamoose"
import { Item } from "dynamoose/dist/Item"

import { getDynamoTableName } from "@shared/infra/dynamoose"

class PartnerItem extends Item {
  id!: string
  registrationId!: string
  name!: string
  tenantId!: string
  createdAt!: number
  updatedAt!: number
}

const PartnerSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    name: { type: String, required: true },
    registrationId: { type: String, required: true },
    tenantId: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
)

const PartnerModel = dynamoose.model<PartnerItem>(
  getDynamoTableName("Partner"),
  PartnerSchema
)

export { PartnerModel, PartnerItem }
