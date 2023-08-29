import { dynamodbCreateTable, dynamodbDescribeTable } from "./aws";



const init = async () => {

  const vendorTableName = 'vendors';

  await dynamodbDescribeTable(vendorTableName);

  const vendorTableParams: AWS.DynamoDB.CreateTableInput = {

    TableName: vendorTableName,

    KeySchema: [
      { AttributeName: 'twitterId', KeyType: 'HASH'}
    ],
    AttributeDefinitions: [
      {AttributeName: 'twitterId', AttributeType: 'S'}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  } 
  // dynamodbCreateTable(vendorTableParams);

}

init();