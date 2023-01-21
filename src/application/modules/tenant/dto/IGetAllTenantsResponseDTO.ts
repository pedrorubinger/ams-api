import { ScanResponse } from "dynamoose/dist/ItemRetriever"

import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { TenantItem } from "@domain/infra/dynamoose/Tenant"

interface IGetAllTenantsParamsDTO {
  /** @default 5 */
  size?: number
  startAt?: string
}

type IGetAllTenantsResponseDTO = Either<
  AppError,
  { tenants: ScanResponse<TenantItem>; lastKey: string | null }
>

export { IGetAllTenantsResponseDTO, IGetAllTenantsParamsDTO }
