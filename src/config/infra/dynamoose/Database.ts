import * as dynamoose from "dynamoose"

const startDynamoDatabase = () => {
  try {
    /* Create new DynamoDB instance */
    const DynamoDatabase = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: process.env.DETA_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.DETA_AWS_SECRET_ACCESS_KEY as string,
      },
      region: process.env.DETA_AWS_REGION as string,
    })

    /* Set DynamoDB instance to the Dynamoose DDB instance */
    dynamoose.aws.ddb.set(DynamoDatabase)
  } catch (err) {
    console.log("[ERROR]: Error trying to connect to Dynamo Database:", err)
  }
}

export { startDynamoDatabase }
