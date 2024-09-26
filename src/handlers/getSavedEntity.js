const EntityManagerInstance = require('../models/EntityManager');

module.exports.handler = async (event) => {
  const { entity_id } = event.pathParameters;
  
  const params = {
    entity_id
  };

  try {
    const result = await EntityManagerInstance.getSavedEntity(params);
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Character not found' }),
      };
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch character' }),
    };
  }
};
