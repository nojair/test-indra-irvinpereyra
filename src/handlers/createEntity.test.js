const EntityManagerInstance = require('../models/EntityManager');
const { handler } = require('../handlers/createEntity');

jest.mock('../models/EntityManager');

describe('Lambda createEntity Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 and a success message when character is created', async () => {
    const event = {
      body: JSON.stringify({ name: 'New Character', attributes: {} })
    };

    EntityManagerInstance.createEntity.mockResolvedValueOnce({
      entity_id: '1234'
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toEqual({ message: 'Character created', entity_id: '1234' });
  });

  it('should return 500 if there is an error creating the character', async () => {
    const event = {
      body: JSON.stringify({ name: 'New Character', attributes: {} })
    };

    EntityManagerInstance.createEntity.mockRejectedValueOnce(new Error('Database error'));

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Could not create character' });
  });
});
