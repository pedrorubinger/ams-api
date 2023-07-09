import * as dynamoose from "dynamoose"

import { AppError, ErrorCodes, left, right } from "@shared/errors"
import { Tables } from "@domain/infra/dynamoose"
import { IGetAllDatabaseMetadataResponse } from "@application/modules/metadata/dto"
import { IMetadataRepository } from "@application/repositories/IMetadataRepository"

export class MetadataRepository implements IMetadataRepository {
  async getAll(): Promise<IGetAllDatabaseMetadataResponse> {
    try {
      let totalDataUsage = 0

      for (const tableName of Tables) {
        const tableMetadata = await dynamoose.aws
          .ddb()
          .describeTable({ TableName: tableName })

        const dataUsageBytes = tableMetadata?.Table?.TableSizeBytes || 0
        totalDataUsage += dataUsageBytes
      }

      const totalSizeInMb = totalDataUsage * 0.000001

      return right({ totalSize: totalSizeInMb })
    } catch (err) {
      console.log("[ERROR] MetadataRepository > getAll", err)
      return left(new AppError(ErrorCodes.INTERNAL))
    }
  }
}
