import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreatePartnerValidator } from "@domain/infra/joi"
import { CreatePartnerUseCase } from "@application/modules/partner"

class CreatePartnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, registrationId, tenantId } = request.body
    const validation = CreatePartnerValidator.validate({
      name,
      registrationId,
      tenantId,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const createPartnerUseCase = container.resolve(CreatePartnerUseCase)
    const result = await createPartnerUseCase.execute({
      name,
      tenantId,
      registrationId,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json({ partner: result.value.partner })
  }
}

export { CreatePartnerController }
