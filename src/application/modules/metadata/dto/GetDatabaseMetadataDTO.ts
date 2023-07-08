import { AppError, Either } from "@shared/errors"

interface IGetAllDonationsOutput {
  t: any
}

type IGetAllDonationsResponseDTO = Either<AppError, IGetAllDonationsOutput>

export { IGetAllDonationsResponseDTO, IGetAllDonationsOutput }
