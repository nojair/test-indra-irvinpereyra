const EntityManagerInstance = require('../models/EntityManager');
const { handler } = require('../handlers/getTranslatedResource');

jest.mock('../models/EntityManager');

describe('Lambda getSavedEntity Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the character if found', async () => {
    const event = {
      pathParameters: { id: '1' }
    };
    
    EntityManagerInstance.getSavedEntity.mockResolvedValueOnce({
      Item: { id: '1', name: 'Resource Name' }
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ id: '1', name: 'Resource Name' });
  });

  it('should return 404 if the Resource is not found', async () => {
    const event = {
      pathParameters: { id: '2' }
    };
    
    EntityManagerInstance.getSavedEntity.mockResolvedValueOnce({
      Item: null
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ error: 'Resource not found' });
  });

  it('should return 500 if there is an error fetching the Resource', async () => {
    const event = {
      pathParameters: { id: '1' }
    };

    EntityManagerInstance.getSavedEntity.mockRejectedValueOnce(new Error('Database error'));

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Could not fetch Resource' });
  });
});
