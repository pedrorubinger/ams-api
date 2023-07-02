import { inject, injectable } from "tsyringe"

import { IDonationsRepository } from "@application/repositories"
import {
  ICreateDonationDTO,
  ICreateDonationResponseDTO,
} from "@application/modules/donation/dto"
import { Donation } from "@domain/entities"

@injectable()
export class CreateDonationUseCase {
  constructor(
    @inject("DonationsRepository")
    private donationsRepository: IDonationsRepository
  ) {}

  async execute({
    billingDate,
    category,
    partnerId,
    value,
    description,
    tenantId,
    incomeDate,
    userId,
  }: ICreateDonationDTO): Promise<ICreateDonationResponseDTO> {
    const partner = Donation.create({
      description,
      incomeDate,
      billingDate,
      category,
      partnerId,
      value,
      tenantId,
    })
    const payload: ICreateDonationDTO = {
      ...partner.props,
      id: partner.id,
      userId,
    }

    return await this.donationsRepository.create(payload)
  }
}
