import { IUser } from "@domain/entities"
import { AppError, Either } from "@shared/errors/"

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
