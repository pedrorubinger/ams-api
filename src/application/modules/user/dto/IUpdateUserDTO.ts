import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IUpdateUserOutput = Omit<IUser, "password">

interface IUpdateUserDTO {
  id: string
  tenantId: string
  name?: string
  newPassword?: string
  phone?: string
}

type IUpdateUserResponseDTO = Either<AppError, { user: IUpdateUserOutput }>

export { IUpdateUserDTO, IUpdateUserResponseDTO, IUpdateUserOutput }
