import { inject, injectable } from "tsyringe"

import { IPartnersRepository } from "@application/repositories"
import {
  IDeletePartnerInput as Input,
  IDeletePartnerResponseDTO as Response,
} from "@application/modules/partner/dto"

type Output = Promise<Response>

@injectable()
export class DeletePartnerUseCase {
  constructor(
    @inject("PartnersRepository")
    private partnersRepository: IPartnersRepository
  ) {}

  async execute({ id, tenantId }: Input): Output {
    return await this.partnersRepository.delete({ id, tenantId })
  }
}
