import { AppError, Either } from "@shared/errors"

interface IGetAllDonationsOutput {
  totalSize: number // in mb
}

type IGetAllDatabaseMetadataResponse = Either<AppError, IGetAllDonationsOutput>

export { IGetAllDatabaseMetadataResponse, IGetAllDonationsOutput }
