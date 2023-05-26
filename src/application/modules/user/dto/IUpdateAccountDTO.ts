import { IUser } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

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
