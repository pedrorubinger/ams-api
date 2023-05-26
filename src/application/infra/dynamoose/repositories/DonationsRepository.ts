import {
  ICreateDonationDTO,
  ICreateDonationResponseDTO,
} from "@application/modules/donation/dto"
import { IDonationsRepository } from "@application/repositories"
import { DonationModel } from "@domain/infra/dynamoose"
import { AppError, ErrorCodes, left, right } from "@shared/errors"

export class DonationsRepository implements IDonationsRepository {
  async create({
    id,
    billingDate,
    category,
    partnerId,
    value,
    description,
    tenantId,
  }: ICreateDonationDTO): Promise<ICreateDonationResponseDTO> {
    try {
      const donation = await DonationModel.create({
        id,
        billingDate,
        category,
        partnerId,
        value,
        description,
        tenantId,
      })

      await donation.save()

      return right({ donation })
    } catch (err) {
      console.log("[ERROR] DonationsRepository > create", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
