import { AppError, Either } from "@shared/errors"

type IDeleteUserResponseDTO = Either<AppError, { success: boolean }>

export { IDeleteUserResponseDTO }
