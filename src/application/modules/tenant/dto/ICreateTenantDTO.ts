import { ITenant } from "@domain/entities/Tenant"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

interface ICreateTenantDTO {
  id?: string
  isActive?: boolean
  name: string
  responsible: string
}

type ICreateTenantResponseDTO = Either<AppError, { tenant: ITenant }>

export { ICreateTenantDTO, ICreateTenantResponseDTO }
