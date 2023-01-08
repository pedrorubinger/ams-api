import * as dynamoose from "dynamoose"

const TenantSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    name: { type: String, required: true },
    responsible: { type: String, required: true }
  },
  { timestamps: true }
)

const TenantModel = dynamoose.model("Tenant", TenantSchema)

export { TenantModel }
