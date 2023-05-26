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
    @inject("PartnersRepository")
    private partnersRepository: IDonationsRepository
  ) {}

  async execute({
    billingDate,
    category,
    partnerId,
    value,
    description,
    tenantId,
  }: ICreateDonationDTO): Promise<ICreateDonationResponseDTO> {
    const partner = Donation.create({
      description,
      billingDate,
      category,
      partnerId,
      value,
      tenantId,
    })
    const payload: ICreateDonationDTO = {
      ...partner.props,
      id: partner.id,
    }

    return await this.partnersRepository.create(payload)
  }
}
