import { IPaginatedResult, IPaginatedParams } from "@core"
import { AppError, Either } from "@shared/errors"
import { DonationItem } from "@domain/infra/dynamoose"
import { Donation, DonationCategory } from "@domain/entities"

interface IGetAllDonationsOutput extends IPaginatedResult<Donation> {
  donations: DonationItem[]
}

interface IGetAllDonationsFilter {
  partnerId?: string
  category?: DonationCategory
}

interface IGetAllDonationsDTO extends IGetAllDonationsFilter, IPaginatedParams {
  tenantId: string
}

type IGetAllDonationsResponseDTO = Either<AppError, IGetAllDonationsOutput>

export {
  IGetAllDonationsDTO,
  IGetAllDonationsResponseDTO,
  IGetAllDonationsOutput,
}
