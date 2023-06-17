import { AppError, Either } from "@shared/errors"
import { DonationItem } from "@domain/infra/dynamoose"
import { DonationCategory } from "@domain/entities"

interface ICreateDonationOutput {
  donation: DonationItem
}

interface ICreateDonationDTO {
  id?: string
  partnerId: string
  billingDate: string[]
  incomeDate: Date
  category: DonationCategory
  value: number // in cents
  description?: string
  tenantId: string
}

type ICreateDonationResponseDTO = Either<AppError, ICreateDonationOutput>

export { ICreateDonationDTO, ICreateDonationResponseDTO, ICreateDonationOutput }
