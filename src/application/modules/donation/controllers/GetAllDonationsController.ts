import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllDonationsValidator } from "@domain/infra/joi"
import { GetAllDonationsUseCase } from "@application/modules/donation"
import { DonationCategory } from "@domain/entities"

class GetAllDonationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tenantId } = request.user
    const { category, partnerId } = request.query

    const validation = GetAllDonationsValidator.validate({
      category,
      partnerId,
      tenantId,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const getAllDonationsUseCase = container.resolve(GetAllDonationsUseCase)
    const result = await getAllDonationsUseCase.execute({
      tenantId,
      category: category as DonationCategory | undefined,
      partnerId: partnerId as string | undefined,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json(result.value)
  }
}

export { GetAllDonationsController }
