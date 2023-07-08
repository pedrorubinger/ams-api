import { IGetAllDonationsResponseDTO } from "@application/modules/metadata/dto"

interface IDatabaseMetadataRepository {
  getAll(): Promise<IGetAllDonationsResponseDTO>
}

export { IDatabaseMetadataRepository }
