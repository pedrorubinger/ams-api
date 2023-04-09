import { Request, Response } from "express"

class ValidateTokenController {
  async handle({ user }: Request, response: Response): Promise<Response> {
    return response.status(200).json({ user })
  }
}

export { ValidateTokenController }
