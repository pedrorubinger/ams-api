import * as dynamoose from "dynamoose"
import { Item } from "dynamoose/dist/Item"

import { IRole } from "@domain/entities/User"

class UserItem extends Item {
  id!: string
  name!: string
  email!: string
  password!: string
  tenantId!: string
  role!: IRole
  phone?: string
  createdAt!: number
  updatedAt!: number
}

const UserSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    tenantId: { type: String, required: true },
    email: {
      type: String,
      required: false,
      index: { name: "emailIndex", type: "global" }
    },
    name: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, required: false },
    phone: { type: String, required: false }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
)

const UserModel = dynamoose.model<UserItem>("User", UserSchema)

export { UserModel, UserItem }
