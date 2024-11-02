"use server";

import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

import { unmarshall } from "@aws-sdk/util-dynamodb";

const dynamodbclient = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const CreateUser = async (email: string, password: string) => {
  const params = {
    TableName: "Users",
    Item: {
      user_id: { S: email },
      email: { S: email },
      username: { S: email },
      password: { S: password },
      role: { S: "user" },
    },
  };

  try {
    const putItemCommand = new PutItemCommand(params);
    let putitemResponse = await dynamodbclient.send(putItemCommand); // putitemResponse

    if (putitemResponse && putitemResponse.$metadata.httpStatusCode === 200) {
      console.log("Item added successfully");
      return true;
    } else {
      console.log("Unexpected error");
      return false;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
