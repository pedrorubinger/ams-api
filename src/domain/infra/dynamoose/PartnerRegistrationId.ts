import * as dynamoose from "dynamoose"
import { Item } from "dynamoose/dist/Item"

import { getDynamoTableName } from "@shared/infra/dynamoose"

class PartnerRegistrationIdItem extends Item {
  id!: string
  lastId!: string
}

const PartnerRegistrationIdSchema = new dynamoose.Schema(
  {
    id: { type: String, required: true, hashKey: true },
    lastId: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
)

const PartnerRegistrationIdModel = dynamoose.model<PartnerRegistrationIdItem>(
  getDynamoTableName("PartnerRegistrationId"),
  PartnerRegistrationIdSchema
)

export { PartnerRegistrationIdModel, PartnerRegistrationIdItem }
