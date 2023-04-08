import * as dynamoose from "dynamoose"
import { Item } from "dynamoose/dist/Item"
import { getDynamoTableName } from "@shared/infra/dynamoose/helpers"

class TenantItem extends Item {
  id!: string
  name!: string
  responsible!: string
  /** @default true */
  isActive!: boolean
  createdAt!: number
  updatedAt!: number
}

const TenantSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
    responsible: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
)

const TenantModel = dynamoose.model<TenantItem>(
  getDynamoTableName("Tenant"),
  TenantSchema
)

export { TenantModel, TenantItem }
