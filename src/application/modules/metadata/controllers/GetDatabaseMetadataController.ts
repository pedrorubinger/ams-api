import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllDonationsUseCase } from "@application/modules/donation"
import { DonationCategory } from "@domain/entities"

class GetDatabaseMetadataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllDonationsUseCase = container.resolve(GetAllDonationsUseCase)
    const result = await getAllDonationsUseCase.execute()

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json(result.value)
  }
}

export { GetDatabaseMetadataController }
