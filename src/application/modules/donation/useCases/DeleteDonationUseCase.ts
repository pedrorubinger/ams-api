import { inject, injectable } from "tsyringe"

import { IDonationsRepository } from "@application/repositories"
import {
  IDeleteDonationResponseDTO,
  IDeleteDonationDTO,
} from "@application/modules/donation/dto"

@injectable()
export class DeleteDonationUseCase {
  constructor(
    @inject("DonationsRepository")
    private donationsRepository: IDonationsRepository
  ) {}

  async execute({
    id,
    tenantId,
  }: IDeleteDonationDTO): Promise<IDeleteDonationResponseDTO> {
    return await this.donationsRepository.delete({ id, tenantId })
  }
}
