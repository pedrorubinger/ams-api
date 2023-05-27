import {
  ICreateDonationDTO,
  ICreateDonationResponseDTO,
  IGetAllDonationsDTO,
  IGetAllDonationsResponseDTO,
} from "@application/modules/donation/dto"

interface IDonationsRepository {
  create(payload: ICreateDonationDTO): Promise<ICreateDonationResponseDTO>
  getAll(params: IGetAllDonationsDTO): Promise<IGetAllDonationsResponseDTO>
}

export { IDonationsRepository }
