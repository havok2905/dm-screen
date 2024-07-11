import { Adventure } from '../sequelize/db';
import { AdventuresResponse } from '../responses';
import { getAdventures } from './getAdventures';

describe('getAdventures', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch adventures and format it into an api response', async () => {
    const mockAdventures = [
      Adventure.build({
        id: '1',
        name: 'Foo Adventure',
        notes: 'notes A',
        system: 'D&D 5e'
      }),
      Adventure.build({
        id: '2',
        name: 'Bar Adventure',
        notes: 'notes B',
        system: 'D&D 5e'
      }),
      Adventure.build({
        id: '3',
        name: 'Baz Adventure',
        notes: 'notes C',
        system: 'D&D 5e'
      })
    ];

    jest.spyOn(Adventure, 'findAll').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(mockAdventures);
      });
    })

    const result: AdventuresResponse = await getAdventures();

    expect(result.adventures.length).toEqual(3);

    expect(result.adventures[0].id).toEqual(mockAdventures[0].dataValues.id);
    expect(result.adventures[0].name).toEqual(mockAdventures[0].dataValues.name);
    expect(result.adventures[0].notes).toEqual(mockAdventures[0].dataValues.notes);
    expect(result.adventures[0].system).toEqual(mockAdventures[0].dataValues.system);

    expect(result.adventures[1].id).toEqual(mockAdventures[1].dataValues.id);
    expect(result.adventures[1].name).toEqual(mockAdventures[1].dataValues.name);
    expect(result.adventures[1].notes).toEqual(mockAdventures[1].dataValues.notes);
    expect(result.adventures[1].system).toEqual(mockAdventures[1].dataValues.system);

    expect(result.adventures[2].id).toEqual(mockAdventures[2].dataValues.id);
    expect(result.adventures[2].name).toEqual(mockAdventures[2].dataValues.name);
    expect(result.adventures[2].notes).toEqual(mockAdventures[2].dataValues.notes);
    expect(result.adventures[2].system).toEqual(mockAdventures[2].dataValues.system);
  });
});