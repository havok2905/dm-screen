import {
  Adventure
} from '../sequelize/db';
import {
  AdventuresResponse
} from '../responses';

export const getAdventures = async (): Promise<AdventuresResponse> => {
  const adventures = await Adventure.findAll();

  const responseJson: AdventuresResponse = {
    adventures: adventures.map((adventure) => {
      return adventure.dataValues
    })
  };

  return responseJson;
};
