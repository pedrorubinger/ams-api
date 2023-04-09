import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IFindUserByEmailOutput = IUser

type IFindUserByEmailResponseDTO = Either<
  AppError,
  { user: IFindUserByEmailOutput | undefined }
>

export { IFindUserByEmailResponseDTO, IFindUserByEmailOutput }
