import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IUpdateUserOutput = Omit<IUser, "password">

interface IUpdateUserDTO {
  id: string
  name?: string
  phone?: string
  tenantId?: string
  // email?: string
}

type IUpdateUserResponseDTO = Either<AppError, { user: IUpdateUserOutput }>

export { IUpdateUserDTO, IUpdateUserResponseDTO, IUpdateUserOutput }
