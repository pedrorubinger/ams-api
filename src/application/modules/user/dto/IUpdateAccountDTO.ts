import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IUpdateAccountOutput = Omit<IUser, "password">

interface IUpdateAccountDTO {
  id: string
  tenantId: string
  name?: string
  newPassword?: string
  phone?: string
}

type IUpdateAccountResponseDTO = Either<
  AppError,
  { user: IUpdateAccountOutput }
>

export { IUpdateAccountDTO, IUpdateAccountResponseDTO, IUpdateAccountOutput }
