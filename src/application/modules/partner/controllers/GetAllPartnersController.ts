import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllPartnersValidator } from "@domain/infra/joi"
import { GetAllPartnersUseCase } from "@application/modules/partner"

class GetAllPartnersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tenantId } = request.user
    const { size, startAt } = request.query
    const validation = GetAllPartnersValidator.validate({ tenantId })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const getAllPartnersUseCase = container.resolve(GetAllPartnersUseCase)
    const result = await getAllPartnersUseCase.execute({
      tenantId,
      size: size ? Number(size) : undefined,
      startAt: startAt as string | undefined,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json(result.value)
  }
}

export { GetAllPartnersController }
