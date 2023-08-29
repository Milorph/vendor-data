import { dynamodbCreateRecord, dynamodbCreateTable, dynamodbDeleteTable, dynamodbDescribeTable } from "./aws";
import vendors from "./data/vendors";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const init = async () => {

  const vendorTableName = 'vendors';

 const vendorsTable = await dynamodbDescribeTable(vendorTableName);

 if (!(vendorsTable instanceof Error)) {
    // DELETE THE TABLE
    await dynamodbDeleteTable(vendorTableName);
    await delay(6000);
 }

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
  
  await dynamodbCreateTable(vendorTableParams);
  await delay(6000)

  for (const i in vendors) {
    const vendor = vendors[i];
    const res = await dynamodbCreateRecord(vendorTableName, vendor)
    if (res instanceof Error){
      console.log('Error: ', vendor, res);
    }
  }
}

init();