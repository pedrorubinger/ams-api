import { ITenant } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

export interface IUpdateTenantDTO {
  id: string
  name?: string
  isActive?: boolean
  responsible?: string
}

export type IUpdateTenantResponseDTO = Either<AppError, { tenant: ITenant }>
