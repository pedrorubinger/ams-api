import { AppError } from "@shared/errors/AppError"
import { Either } from "@shared/errors/Either"

type IDeleteTenantResponseDTO = Either<AppError, { success: boolean }>

export { IDeleteTenantResponseDTO }
