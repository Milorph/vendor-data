import { marshall } from '@aws-sdk/util-dynamodb';
import AWS from 'aws-sdk'
import { AWSRegions } from './types/aws'
import { Vendor } from './types/twitter';

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

// Delete the table
export const dynamodbDeleteTable = async (tableName: string) => {

  try {
    const result = await dynamodb.deleteTable({
      TableName: tableName
    }).promise();
    console.log('Table Deleted', result);
    return result;
  } catch(e) {
      if (e instanceof Error) {
        throw e
      }
      throw new Error(`dynamodbDeleteTable error object unkown type`)
  }

}

export const dynamodbCreateRecord = async (tableName: string, vendor: Vendor) => {

  try {

      await dynamodb.putItem({
        TableName:tableName,
        Item: marshall(vendor)
      }).promise();
      console.log('Record Created');

  } catch(e) {
      if (e instanceof Error) {
        return e
      }
      throw new Error(`dynamodbCreateRecord error object unkown type`)
  }

}