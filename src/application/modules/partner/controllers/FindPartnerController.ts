import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindPartnerValidator } from "@domain/infra/joi"
import {
  FindPartnerField,
  FindPartnerUseCase,
} from "@application/modules/partner"

class FindPartnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { field, content } = request.query
    const { tenantId } = request.user
    const validation = FindPartnerValidator.validate({
      field,
      content,
      tenantId,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const createPartnerUseCase = container.resolve(FindPartnerUseCase)
    const result = await createPartnerUseCase.execute({
      field: field as FindPartnerField,
      content: content as string,
      tenantId,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ partners: result.value.partners })
  }
}

export { FindPartnerController }
