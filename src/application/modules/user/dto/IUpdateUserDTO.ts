import { IUser } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

type IUpdateUserOutput = Omit<IUser, "password">

interface IUpdateUserDTO {
  id: string
  name?: string
  phone?: string
  tenantId?: string
  isActive?: boolean
  // email?: string
}

type IUpdateUserResponseDTO = Either<AppError, { user: IUpdateUserOutput }>

export { IUpdateUserDTO, IUpdateUserResponseDTO, IUpdateUserOutput }
