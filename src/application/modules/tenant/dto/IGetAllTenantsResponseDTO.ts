import { ScanResponse } from "dynamoose/dist/ItemRetriever"

import { TenantItem } from "@domain/infra/dynamoose"
import { AppError, Either } from "@shared/errors"

interface IGetAllTenantsParamsDTO {
  /** @default 5 */
  size?: number
  startAt?: string
}

type IGetAllTenantsResponseDTO = Either<
  AppError,
  { tenants: ScanResponse<TenantItem>; lastKey: string | null; total: number }
>

export { IGetAllTenantsResponseDTO, IGetAllTenantsParamsDTO }
