import { IGetAllDatabaseMetadataResponse } from "@application/modules/metadata/dto"

interface IMetadataRepository {
  getAll(): Promise<IGetAllDatabaseMetadataResponse>
}

export { IMetadataRepository }
