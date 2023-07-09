import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeleteDonationUseCase } from "@application/modules/donation"

class DeleteDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { tenantId } = request.user
    const deleteDonationUseCase = container.resolve(DeleteDonationUseCase)
    const result = await deleteDonationUseCase.execute({ id, tenantId })

    if (result.isLeft()) {
      return response
        .status(result.value.status)
        .json({ code: result.value.message })
    }

    return response.status(200).json({ success: result.value.success })
  }
}

export { DeleteDonationController }
