import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateAccountValidator } from "@domain/infra/joi"
import { AuthenticateUserUseCase } from "@application/modules/authentication/useCases/AuthenticateUserUseCase"
import { UpdateAccountUseCase } from "@application/modules/user/useCases/UpdateAccountUseCase"
import { ValidateUserPasswordUseCase } from "@application/modules/user/useCases/ValidateUserPasswordUseCase"

class UpdateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, email, tenantId } = request.user
    const { name, password, newPassword, phone } = request.body

    const validation = UpdateAccountValidator.validate({
      name,
      password,
      newPassword,
      phone,
    })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const validateUserPasswordUseCase = container.resolve(
      ValidateUserPasswordUseCase
    )
    const validationResult = await validateUserPasswordUseCase.execute({
      id,
      password,
    })

    if (validationResult.isLeft()) {
      return response
        .status(validationResult.value.status)
        .json({ code: validationResult.value.message })
    }

    const updateAccountUseCase = container.resolve(UpdateAccountUseCase)
    const result = await updateAccountUseCase.execute({
      id,
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

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const authenticationResult = await authenticateUserUseCase.execute({
      email,
      password: newPassword || password,
    })

    if (authenticationResult.isLeft()) {
      return response
        .status(authenticationResult.value.status)
        .json({ code: authenticationResult.value.message })
    }

    return response.status(200).json({
      user: result.value.user,
      token: authenticationResult.value.token,
    })
  }
}

export { UpdateAccountController }
