import { AppError, Either } from "@shared/errors"

export type IDeleteTenantResponseDTO = Either<AppError, { success: boolean }>
