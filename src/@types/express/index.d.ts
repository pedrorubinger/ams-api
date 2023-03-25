import { IRole } from "@domain/entities/User"

export {}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        name: string
        tenantId: string
        role: IRole
      }
    }
  }
}
