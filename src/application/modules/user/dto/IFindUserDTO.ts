import { IUser } from "@domain/entities/User"
import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IFindUserOutput = Omit<IUser, "password">

type IFindUserResponseDTO = Either<AppError, { user: IFindUserOutput }>

export { IFindUserResponseDTO, IFindUserOutput }
