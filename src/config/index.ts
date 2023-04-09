import dotenv from "dotenv"

import { startDynamoDatabase } from "@config/infra/dynamoose/Database"
import { StageEnvironment } from "@shared/types"

dotenv.config()

/** SERVER */
export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const STAGE = process.env.STAGE as StageEnvironment

/** AWS */
export const DETA_AWS_ACCESS_KEY_ID = process.env.DETA_AWS_ACCESS_KEY_ID
export const DETA_AWS_SECRET_ACCESS_KEY = process.env.DETA_AWS_SECRET_ACCESS_KEY
export const DETA_AWS_REGION = process.env.DETA_AWS_REGION

/** DATABASE */
export const connectDatabase = startDynamoDatabase
