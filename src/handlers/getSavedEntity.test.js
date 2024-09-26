const EntityManagerInstance = require('../models/EntityManager');
const { handler } = require('../handlers/getSavedEntity');

jest.mock('../models/EntityManager');

describe('Lambda getSavedEntity Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the character data if character is found', async () => {
    const event = {
      pathParameters: {
        entity_id: '1234'
      }
    };

    EntityManagerInstance.getSavedEntity.mockResolvedValueOnce({
      Item: { id: '1234', name: 'Character Name' }
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ id: '1234', name: 'Character Name' });
  });

  it('should return 404 if the character is not found', async () => {
    const event = {
      pathParameters: {
        entity_id: '5678'
      }
    };

    // Simulamos que no se encuentra el personaje
    EntityManagerInstance.getSavedEntity.mockResolvedValueOnce({
      Item: null
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ error: 'Character not found' });
  });

  it('should return 500 if there is an error fetching the character', async () => {
    const event = {
      pathParameters: {
        entity_id: '1234'
      }
    };

    EntityManagerInstance.getSavedEntity.mockRejectedValueOnce(new Error('Database error'));

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Could not fetch character' });
  });
});
