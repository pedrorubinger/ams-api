import { inject, injectable } from "tsyringe"

import { IPartnersRepository } from "@application/repositories"
import {
  IUpdatePartnerDTO,
  IUpdatePartnerResponseDTO,
} from "@application/modules/partner/dto"

@injectable()
export class UpdatePartnerUseCase {
  constructor(
    @inject("PartnersRepository")
    private partnersRepository: IPartnersRepository
  ) {}

  async execute({
    id,
    name,
    registrationId,
    autoRegistration,
  }: IUpdatePartnerDTO): Promise<IUpdatePartnerResponseDTO> {
    return await this.partnersRepository.update({
      id,
      name,
      registrationId,
      autoRegistration,
    })
  }
}
