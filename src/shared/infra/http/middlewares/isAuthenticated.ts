import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { ErrorCodes } from "@shared/errors/ErrorCodes"
import { container } from "tsyringe"
import { IUsersRepository } from "@application/repositories/IUsersRepository"
import { JWT_SECRET } from "@config"

interface IPayload {
  sub: string
}

const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ code: ErrorCodes.MISSING_TOKEN })
  }

  const [, token] = authHeader.split(" ")
  let id = null

  try {
    const { sub: userId } = verify(token, JWT_SECRET as string) as IPayload

    id = userId
  } catch (err) {
    return response.status(401).json({ code: ErrorCodes.INVALID_TOKEN })
  }

  const usersRepository = container.resolve<IUsersRepository>("UsersRepository")
  const result = await usersRepository.find(id)

  if (result.isLeft()) {
    return response
      .status(result.value.status)
      .json({ code: result.value.message })
  }

  request.user = { id }

  next()
}

export { isAuthenticated }
