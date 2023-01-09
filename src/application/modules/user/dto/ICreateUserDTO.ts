import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"
import { IRole } from "@domain/entities/User"

type ICreateUserOutput = Omit<IUser, "password">

interface ICreateUserDTO {
  id?: string
  tenantId: string
  name: string
  email: string
  password: string
  phone?: string
  role: IRole
}

type ICreateUserResponseDTO = Either<AppError, { user: ICreateUserOutput }>

export { ICreateUserDTO, ICreateUserResponseDTO, ICreateUserOutput }
