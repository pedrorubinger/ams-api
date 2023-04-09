import * as config from "@config"
import { StageEnvironment } from "@shared/types"

export const getDynamoTableName = (name: string): string => {
  const environment = config.STAGE as StageEnvironment

  switch (environment) {
    case "dev":
      return `DEV_${name}`
    case "prod":
      return `PROD_${name}`
    default:
      return name
  }
}
