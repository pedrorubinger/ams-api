import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateUserUseCase } from "@application/modules/authentication"

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
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
