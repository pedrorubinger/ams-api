import dotenv from "dotenv"

import { startDynamoDatabase } from "@config/infra/dynamoose"

dotenv.config()

/** SERVER */
export const PORT = process.env.PORT
export const HOST = process.env.HOST

/** AWS */
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
export const AWS_REGION = process.env.AWS_REGION

/** DATABASE */
export const connectDatabase = startDynamoDatabase
