import {
  ICreateDonationDTO,
  ICreateDonationResponseDTO,
  IDeleteDonationDTO,
  IDeleteDonationResponseDTO,
  IGetAllDonationsDTO,
  IGetAllDonationsResponseDTO,
} from "@application/modules/donation/dto"

interface IDonationsRepository {
  create(payload: ICreateDonationDTO): Promise<ICreateDonationResponseDTO>
  getAll(params: IGetAllDonationsDTO): Promise<IGetAllDonationsResponseDTO>
  delete(params: IDeleteDonationDTO): Promise<IDeleteDonationResponseDTO>
}

export { IDonationsRepository }
