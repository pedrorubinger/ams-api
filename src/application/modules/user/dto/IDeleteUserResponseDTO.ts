import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IDeleteUserResponseDTO = Either<AppError, { success: boolean }>

export { IDeleteUserResponseDTO }
