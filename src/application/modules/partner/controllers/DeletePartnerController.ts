import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeletePartnerValidator } from "@domain/infra/joi"
import { DeletePartnerUseCase } from "@application/modules/partner"

class DeletePartnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { tenantId } = request.user
    const validation = DeletePartnerValidator.validate({
      id,
      tenantId,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const deletePartnerUseCase = container.resolve(DeletePartnerUseCase)
    const result = await deletePartnerUseCase.execute({ id, tenantId })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ success: result.value.success })
  }
}

export { DeletePartnerController }
