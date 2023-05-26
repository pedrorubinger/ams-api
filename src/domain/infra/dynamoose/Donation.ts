import * as dynamoose from "dynamoose"
import { Item } from "dynamoose/dist/Item"

import { getDynamoTableName } from "@shared/infra/dynamoose"
import { DonationCategory } from "@domain/entities"

class DonationItem extends Item {
  id!: string
  partnerId!: string
  billingDate!: string[]
  category!: DonationCategory
  value!: number // in cents
  description?: string
  tenantId!: string
  createdAt!: number
  updatedAt!: number
}

const DonationSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    partnerId: { type: String, required: true },
    billingDate: { type: String, required: true },
    category: { type: String, required: true },
    value: { type: Number, required: true },
    description: { type: String, required: false },
    tenantId: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
)

const DonationModel = dynamoose.model<DonationItem>(
  getDynamoTableName("Donation"),
  DonationSchema
)

export { DonationModel, DonationItem }
