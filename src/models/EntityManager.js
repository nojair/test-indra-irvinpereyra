const { QueryCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { ulid } = require("ulidx");
const dbClientInstance = require('../db');

class EntityManager {
  static instance;

  constructor() {
    this.docDbClient = dbClientInstance.getDocumentClient();
    this.dbClient = dbClientInstance.getClient();
  }

  static getInstance() {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager();
    }
    return EntityManager.instance;
  }

  commandToCreateEntity(attributes) {
    const entity_id = ulid();
    const PK = `ENTITY#${entity_id}`;
    const SK = `PURE_ENTITY`;

    return {
      command: new PutCommand({
        TableName: dbClientInstance.getConfig().TABLE_NAME,
        Item: {
          PK,
          SK,
          ...attributes,
        }
      }),
      entity_id
    }
  }

  async createEntity(attributes) {
    const { command, entity_id } = this.commandToCreateEntity(attributes);
    console.log('entity_id', entity_id)
    await this.docDbClient.send(command);
    return { entity_id };
  }

  commandToGetEntity(entity_id) {
    return new QueryCommand({
      TableName: dbClientInstance.getConfig().TABLE_NAME,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': { S: `ENTITY#${entity_id}` },
        ':sk': { S: 'PURE_ENTITY' }
      }
    });
  }

  async getSavedEntity(entity_id) {
    try {
      const command = this.commandToGetEntity(entity_id);
      const { Items } = await this.dbClient.send(command);

      if (!Items || Items.length === 0) {
        throw new Error("La entidad no existe");
      }

      return Items.map((Item) => unmarshall(Item));
    } catch (error) {
      throw error;
    }
  }
}

const EntityManagerInstance = EntityManager.getInstance();
module.exports = EntityManagerInstance
