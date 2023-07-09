import { inject, injectable } from "tsyringe"

import { IMetadataRepository } from "@application/repositories"
import { IGetAllDatabaseMetadataResponse } from "@application/modules/metadata/dto"

@injectable()
export class GetDatabaseMetadataUseCase {
  constructor(
    @inject("MetadataRepository")
    private databaseMetadataRepository: IMetadataRepository
  ) {}

  async execute(): Promise<IGetAllDatabaseMetadataResponse> {
    return await this.databaseMetadataRepository.getAll()
  }
}
