import { AppError, Either } from "@shared/errors"

interface IDeleteDonationOutput {
  success: boolean
}

type IDeleteDonationResponseDTO = Either<AppError, IDeleteDonationOutput>

interface IDeleteDonationDTO {
  id: string
  tenantId: string
}

export { IDeleteDonationDTO, IDeleteDonationResponseDTO, IDeleteDonationOutput }
