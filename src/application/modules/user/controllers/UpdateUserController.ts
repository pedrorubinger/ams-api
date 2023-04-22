import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateUserValidator } from "@domain/infra/joi"
import { UpdateUserUseCase } from "@application/modules/user"

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, phone, tenantId, isActive } = request.body
    const validation = UpdateUserValidator.validate({
      name,
      phone,
      tenantId,
      isActive,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const updateUserUseCase = container.resolve(UpdateUserUseCase)
    const result = await updateUserUseCase.execute({
      id,
      name,
      phone,
      tenantId,
      isActive,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ user: result.value.user })
  }
}

export { UpdateUserController }
