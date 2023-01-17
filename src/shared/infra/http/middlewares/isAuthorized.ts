import { NextFunction, Request, Response } from "express"

import { ErrorCodes } from "@shared/errors/ErrorCodes"
import { IRole } from "@domain/entities/User"

interface IIsAuthorizedParams {
  /** Provided roles are authorized to access the resource. */
  roles: IRole[]
}

/** This middleware validates if the resource can be accessed by user. */
const isAuthorized =
  ({ roles }: IIsAuthorizedParams) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { role } = request.user

    if (!roles.includes(role)) {
      return response.status(401).json({ code: ErrorCodes.NOT_AUTHORIZED })
    }

    next()
  }

export { isAuthorized }
