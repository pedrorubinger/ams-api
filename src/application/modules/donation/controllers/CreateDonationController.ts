import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateDonationValidator } from "@domain/infra/joi"
import { CreateDonationUseCase } from "@application/modules/donation"

class CreateDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { billingDate, category, partnerId, value, description, incomeDate } =
      request.body
    const { tenantId, id } = request.user
    const validation = CreateDonationValidator.validate({
      incomeDate,
      billingDate,
      category,
      partnerId,
      value,
      description,
      tenantId,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const createDonationUseCase = container.resolve(CreateDonationUseCase)
    const result = await createDonationUseCase.execute({
      incomeDate,
      billingDate,
      category,
      partnerId,
      value,
      description,
      tenantId,
      userId: id,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json({ donation: result.value.donation })
  }
}

export { CreateDonationController }
