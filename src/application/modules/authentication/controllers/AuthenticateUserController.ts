import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateUserUseCase } from "@application/modules/authentication"
import { AuthenticateUserValidator } from "@domain/infra/joi"

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const validation = AuthenticateUserValidator.validate({ email, password })

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const result = await authenticateUserUseCase.execute({ email, password })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response
      .status(200)
      .json({ token: result.value.token, user: result.value.user })
  }
}

export { AuthenticateUserController }
