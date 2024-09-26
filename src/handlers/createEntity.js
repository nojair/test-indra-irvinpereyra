const EntityManagerInstance = require('../models/EntityManager');

module.exports.handler = async (event) => {
  const params = JSON.parse(event.body);

  try {
    const { entity_id } = await EntityManagerInstance.createEntity(params);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Character created', entity_id }),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create character' }),
    };
  }
};
