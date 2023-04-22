import { IUser } from "@domain/entities"
import { AppError, Either } from "@shared/errors"

type IFindUserByEmailOutput = IUser

type IFindUserByEmailResponseDTO = Either<
  AppError,
  { user: IFindUserByEmailOutput | undefined }
>

export { IFindUserByEmailResponseDTO, IFindUserByEmailOutput }
