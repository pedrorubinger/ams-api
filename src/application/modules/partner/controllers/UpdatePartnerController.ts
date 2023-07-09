import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdatePartnerValidator } from "@domain/infra/joi"
import { UpdatePartnerUseCase } from "@application/modules/partner"

class UpdatePartnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { tenantId } = request.user
    const { name, registrationId, autoRegistration } = request.body
    const validation = UpdatePartnerValidator.validate({
      name,
      registrationId,
      tenantId,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const updatePartnerUseCase = container.resolve(UpdatePartnerUseCase)
    const result = await updatePartnerUseCase.execute({
      id,
      name,
      registrationId,
      autoRegistration,
      tenantId,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json({ partner: result.value.partner })
  }
}

export { UpdatePartnerController }
