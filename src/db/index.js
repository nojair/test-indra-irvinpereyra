const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const config = {
  REGION: process.env.AWS_REGION,
  TABLE_NAME: process.env.TABLE_NAME
};

class DBClient {
  static instance;

  constructor() {
    this.dynamoDBClient = new DynamoDBClient({ region: config.REGION });
    this.dynamoDBDocumentClient = DynamoDBDocumentClient.from(this.dynamoDBClient);
  }

  static getInstance() {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  }

  getClient() {
    return this.dynamoDBClient;
  }

  getDocumentClient() {
    return this.dynamoDBDocumentClient;
  }
  
  getConfig() {
    return config;
  }
}

const dbClientInstance = DBClient.getInstance();
module.exports = dbClientInstance
