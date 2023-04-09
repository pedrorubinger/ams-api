import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IFindUserOutput = IUser
type IFindUserResponseWithoutPasswordDTO = Either<
  AppError,
  { user: Omit<IUser, "password"> }
>
type IFindUserResponseDTO = Either<AppError, { user: IFindUserOutput }>

export {
  IFindUserResponseDTO,
  IFindUserOutput,
  IFindUserResponseWithoutPasswordDTO,
}
