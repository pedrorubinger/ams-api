import { ITenant } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

interface ICreateTenantDTO {
  id?: string
  isActive?: boolean
  name: string
  responsible: string
}

type ICreateTenantResponseDTO = Either<AppError, { tenant: ITenant }>

export { ICreateTenantDTO, ICreateTenantResponseDTO }
