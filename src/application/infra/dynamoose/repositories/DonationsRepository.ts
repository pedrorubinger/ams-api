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
    incomeDate,
    category,
    partnerId,
    value,
    description,
    tenantId,
    userId,
  }: ICreateDonationDTO): Promise<ICreateDonationResponseDTO> {
    try {
      const donation = await DonationModel.create({
        id,
        incomeDate,
        billingDate,
        category,
        partnerId,
        value,
        description,
        tenantId,
        userId,
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
      if (params?.size) scan.limit(params.size)
      if (params?.startAt) scan.startAt({ id: params.startAt })

      const total = params?.partnerId
        ? await DonationModel.scan()
            .where("partnerId")
            .eq(params.partnerId)
            .and()
            .where("tenantId")
            .eq(params.tenantId)
            .count()
            .exec()
        : await DonationModel.scan()
            .where("tenantId")
            .eq(params.tenantId)
            .count()
            .exec()
      const donations = await scan.exec()

      return right({
        donations,
        total: total.count,
        count: donations.length,
        lastKey: !donations?.count
          ? null
          : ((donations?.lastKey?.id ?? null) as string | null),
      })
    } catch (err) {
      console.log("[ERROR] DonationsRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
