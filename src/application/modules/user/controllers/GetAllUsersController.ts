import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetAllUsersUseCase } from "@application/modules/user/useCases/GetAllUsersUseCase"

class GetAllUsersController {
  async handle(_: Request, response: Response): Promise<Response> {
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase)
    const result = await getAllUsersUseCase.execute()

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(201).json(result.value)
  }
}

export { GetAllUsersController }
