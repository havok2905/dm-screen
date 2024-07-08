import { Adventure } from './Adventure';
import { AdventureCreature } from './AdventureCreature';
import { AdventureHandout } from './AdventureHandout';
import { AdventureItem } from './AdventureItem';

export const establishModelRelationships = () => {
  AdventureCreature.belongsTo(Adventure);
  AdventureHandout.belongsTo(Adventure);
  AdventureItem.belongsTo(Adventure);
};
