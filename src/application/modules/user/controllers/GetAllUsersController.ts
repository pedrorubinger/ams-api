import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllUsersUseCase } from "@application/modules/user"

class GetAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, size, startAt } = request.query

    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase)
    const result = await getAllUsersUseCase.execute({
      email: email as string | undefined,
      startAt: startAt as string | undefined,
      size: (size as string | undefined) ? Number(size) : undefined,
    })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json(result.value)
  }
}

export { GetAllUsersController }
