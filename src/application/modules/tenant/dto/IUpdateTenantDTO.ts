import { ITenant } from "@domain/entities/Tenant"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

interface IUpdateTenantDTO {
  id: string
  name?: string
  responsible?: string
}

type IUpdateTenantResponseDTO = Either<AppError, { tenant: ITenant }>

export { IUpdateTenantDTO, IUpdateTenantResponseDTO }
