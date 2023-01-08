import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { IRole } from "@domain/entities/User"

interface ICreateUserDTO {
  id?: string
  tenantId: string
  name: string
  email: string
  password: string
  phone?: string
  role: IRole
}

type ICreateUserResponseDTO = Either<AppError, { user: any }>

export { ICreateUserDTO, ICreateUserResponseDTO }
