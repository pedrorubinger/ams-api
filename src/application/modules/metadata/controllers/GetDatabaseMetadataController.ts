import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetDatabaseMetadataUseCase } from "@application/modules/metadata/useCases"

class GetDatabaseMetadataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllDatabaseMetadataUseCase = container.resolve(
      GetDatabaseMetadataUseCase
    )
    const result = await getAllDatabaseMetadataUseCase.execute()

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json(result.value)
  }
}

export { GetDatabaseMetadataController }
