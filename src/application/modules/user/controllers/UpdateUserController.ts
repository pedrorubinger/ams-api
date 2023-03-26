import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateUserValidator } from "@domain/infra/joi"
import { UpdateUserUseCase } from "@application/modules/user/useCases/UpdateUserUseCase"
import { ValidateUserPasswordUseCase } from "@application/modules/user/useCases/ValidateUserPasswordUseCase"

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tenantId, id: tokenUserId, role } = request.user
    const { id, name, password, newPassword, phone } = request.body
    const userId = role === "master" && id ? id : tokenUserId

    const validation = UpdateUserValidator.validate({
      name,
      password,
      newPassword,
      phone,
      role,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const validateUserPasswordUseCase = container.resolve(
      ValidateUserPasswordUseCase
    )
    const validationResult = await validateUserPasswordUseCase.execute({
      id: userId,
      password,
    })

    if (validationResult.isLeft()) {
      return response
        .status(validationResult.value.status)
        .json({ code: validationResult.value.message })
    }

    const updateUserUseCase = container.resolve(UpdateUserUseCase)
    const result = await updateUserUseCase.execute({
      id: userId,
      newPassword,
      name,
      phone,
      tenantId,
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
