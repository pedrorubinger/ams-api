import { inject, injectable } from "tsyringe"

import { IPartnersRepository } from "@application/repositories"
import {
  ICreatePartnerDTO,
  ICreatePartnerResponseDTO,
} from "@application/modules/partner/dto"
import { Partner } from "@domain/entities"

@injectable()
export class CreatePartnerUseCase {
  constructor(
    @inject("PartnersRepository")
    private partnersRepository: IPartnersRepository
  ) {}

  async execute({
    name,
    registrationId,
    tenantId,
  }: ICreatePartnerDTO): Promise<ICreatePartnerResponseDTO> {
    const partner = Partner.create({ name, registrationId })
    const payload: ICreatePartnerDTO = {
      ...partner.props,
      id: partner.id,
      tenantId,
    }

    return await this.partnersRepository.create(payload)
  }
}
