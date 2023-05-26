import { AppError, Either } from "@shared/errors"

interface IDeletePartnerOutput {
  success: boolean
}

type IDeletePartnerResponseDTO = Either<AppError, IDeletePartnerOutput>

interface IDeletePartnerInput {
  id: string
  tenantId: string
}

export { IDeletePartnerInput, IDeletePartnerResponseDTO, IDeletePartnerOutput }
