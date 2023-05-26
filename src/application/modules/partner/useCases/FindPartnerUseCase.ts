import { inject, injectable } from "tsyringe"

import { IPartnersRepository } from "@application/repositories"
import {
  IFindPartnerInput as Input,
  IFindPartnerResponseDTO as Response,
} from "@application/modules/partner/dto"

type Output = Promise<Response>

@injectable()
export class FindPartnerUseCase {
  constructor(
    @inject("PartnersRepository")
    private partnersRepository: IPartnersRepository
  ) {}

  async execute({ field, content, tenantId }: Input): Output {
    return await this.partnersRepository.find({ field, content, tenantId })
  }
}
