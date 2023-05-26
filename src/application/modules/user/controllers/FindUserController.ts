import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindUserUseCase } from "@application/modules/user"

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const findUserUseCase = container.resolve(FindUserUseCase)
    const result = await findUserUseCase.execute(id)

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json({ user: result.value.user })
  }
}

export { FindUserController }
