import AWS from 'aws-sdk'
import { AWSRegions } from './types/aws'

AWS.config.update({region: AWSRegions.US_EAST_1})

const { DynamoDB } = AWS;

const dynamodb = new DynamoDB();

// Create the table
export const dynamodbCreateTable = async (params: AWS.DynamoDB.CreateTableInput) => {

  try {
    const result = await dynamodb.createTable(params).promise();
    console.log("Table created", result);
    return result;
  } catch(e) {
      if (e instanceof Error) {
        throw e
      }
      throw new Error(`dynamodbCreateTable error object unkown type`)
  }

}

// Describe the table
export const dynamodbDescribeTable = async (tableName: string) => {

  try {
    const table = await dynamodb.describeTable({
      TableName: tableName
    }).promise();
    console.log('Table retrieved', table);
    return table;
  } catch(e) {
      if (e instanceof Error) {
        return e
      }
      throw new Error(`dynamodbDescribeTable error object unkown type`)
  }

}