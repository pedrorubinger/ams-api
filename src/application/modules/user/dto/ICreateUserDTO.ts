import { IUser, IRole } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

type ICreateUserOutput = Omit<IUser, "password">

interface ICreateUserDTO {
  id?: string
  tenantId: string
  name: string
  email: string
  password: string
  phone?: string
  role: IRole
  isActive?: boolean
}

type ICreateUserResponseDTO = Either<AppError, { user: ICreateUserOutput }>

export { ICreateUserDTO, ICreateUserResponseDTO, ICreateUserOutput }
