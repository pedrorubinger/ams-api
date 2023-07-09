import { Router } from "express"

import { isAuthenticated, isAuthorized } from "@shared/infra/http/middlewares"
import { GetDatabaseMetadataController } from "@application/modules/metadata"

const metadataRoutes = Router()

const getAllDatabaseMetadataController = new GetDatabaseMetadataController()

metadataRoutes.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["admin"] }),
  getAllDatabaseMetadataController.handle
)

export { metadataRoutes }
