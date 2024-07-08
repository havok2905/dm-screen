import {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem
} from '../database/models';
import {
  AdventureResponse
} from '../responses';

export const getAdventureById = async (id: string): Promise<AdventureResponse> => {
  const adventure = await Adventure.findOne({
    where: {
      id: id
    }
  });

  const adventureCreatures = await AdventureCreature.findAll({
    where: {
      adventureid: id
    }
  });

  const adventureHandouts = await AdventureHandout.findAll({
    where: {
      adventureid: id
    }
  });

  const adventureItems = await AdventureItem.findAll({
    where: {
      adventureid: id
    }
  });

  const responseJson: AdventureResponse = {
    ...adventure?.dataValues,
    creatures: adventureCreatures.map((c) => {
      return {
        ...c.dataValues,
        metadata: JSON.parse(c.dataValues.metadata)
      };
    }),
    handouts: adventureHandouts.map((h) => h.dataValues),
    items: adventureItems.map((i) => {
      return {
        ...i.dataValues,
        metadata: JSON.parse(i.dataValues.metadata)
      };
    })
  };

  return responseJson;
}