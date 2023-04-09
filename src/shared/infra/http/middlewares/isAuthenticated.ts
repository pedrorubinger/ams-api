import { NextFunction, Request, Response } from "express"
import JWT, { verify } from "jsonwebtoken"

import { ErrorCodes } from "@shared/errors/ErrorCodes"
import { JWT_SECRET } from "@config"
import { IRole } from "@domain/entities/User"

interface IPayload {
  id: string
  name: string
  role: IRole
  email: string
  tenantId: string
  iat: number
  exp: number
}

/** This middleware validates if an user is authenticated before accessing resources. */
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

  try {
    const { id, role, tenantId, name, email } = verify(
      token,
      JWT_SECRET as string
    ) as IPayload

    request.user = { id, role, tenantId, name, email }

    next()
  } catch (err) {
    const code =
      err instanceof JWT.TokenExpiredError
        ? ErrorCodes.TOKEN_HAS_EXPIRED
        : ErrorCodes.INVALID_TOKEN

    return response.status(401).json({ code })
  }
}

export { isAuthenticated }
