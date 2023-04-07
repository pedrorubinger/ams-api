import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeleteUserUseCase } from "@application/modules/user/useCases/DeleteUserUseCase"

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)
    const result = await deleteUserUseCase.execute(id)

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ success: result.value.success })
  }
}

export { DeleteUserController }
