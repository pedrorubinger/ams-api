import {
  ICreateDonationDTO,
  ICreateDonationResponseDTO,
  IGetAllDonationsDTO,
  IGetAllDonationsResponseDTO,
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

  async getAll(
    params: IGetAllDonationsDTO
  ): Promise<IGetAllDonationsResponseDTO> {
    try {
      const scan = DonationModel.scan().where("tenantId").eq(params.tenantId)

      if (params?.partnerId) scan.and().where("partnerId").eq(params.partnerId)
      if (params?.category) scan.and().where("category").eq(params.category)

      const total = await DonationModel.scan().count().exec()
      const donations = await scan.exec()

      return right({
        donations,
        total: total.count,
        count: donations.length,
      })
    } catch (err) {
      console.log("[ERROR] DonationsRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
