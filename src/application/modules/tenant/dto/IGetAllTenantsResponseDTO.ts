import { ScanResponse } from "dynamoose/dist/ItemRetriever"

import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { TenantItem } from "@domain/infra/dynamoose/Tenant"

type IGetAllTenantsResponseDTO = Either<
  AppError,
  { tenants: ScanResponse<TenantItem> }
>

export { IGetAllTenantsResponseDTO }
