import { inject, injectable } from "tsyringe"

import { IPartnersRepository } from "@application/repositories"
import {
  IGetAllPartnersInput,
  IGetAllPartnersResponseDTO,
} from "@application/modules/partner/dto"

@injectable()
export class GetAllPartnersUseCase {
  constructor(
    @inject("PartnersRepository")
    private partnersRepository: IPartnersRepository
  ) {}

  async execute({
    tenantId,
  }: IGetAllPartnersInput): Promise<IGetAllPartnersResponseDTO> {
    return await this.partnersRepository.getAll({ tenantId })
  }
}
