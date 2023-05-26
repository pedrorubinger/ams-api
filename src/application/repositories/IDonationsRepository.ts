import {
  ICreateDonationDTO,
  ICreateDonationResponseDTO,
} from "@application/modules/donation/dto"

interface IDonationsRepository {
  create(payload: ICreateDonationDTO): Promise<ICreateDonationResponseDTO>
}

export { IDonationsRepository }
