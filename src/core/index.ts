import { Adventure } from './types';
import { v4 as uuidv4 } from 'uuid';

export const adventure: Adventure = {
  name: 'Test Adventure',
  notes: `
# The Adventure

## Lorem ipsum header 2

Lorem ipsum dolor set amet.
`,
  system: 'D&D 5e (2014)',
  creatures: [
    {
      id: uuidv4(),
      name: 'Giant Rat',
      metadata: [
        {
          name: 'Type',
          type: 'string',
          value: 'Beast'
        },
        {
          name: 'AC',
          type: 'number',
          value: 12
        },
        {
          name: 'HP',
          type: 'number',
          value: 7
        },
        {
          name: 'CR',
          type: 'string',
          value: '1/8'
        }
      ],
      content: `
# Giant Rat

*Small Beast, Unaligned*

**Armor Class** 12

**Hit Points** 7 (2d6)

**Speed** 30 ft.

| STR | DEX | CON | INT | WIS | CHA |
| --- | --- | --- | --- | --- | --- |
|  7  | 15  | 11  |  2  | 10  |  4  |
| -2  | +2  | +0  | -4  | +0  | -3  |

**Senses** Darkvision 60 ft., Passive Perception 10

**Languages** --

**Challenge** 1/8 (25 XP)

**Proficiency Bonus** +2

---

**Keen Smell.** The rat has advantage on Wisdom (Perception) checks that rely on smell.

**Pack Tactics.** The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 feet of the creature and the ally isn't incapacitated.

## Actions

**Bite.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.
`
    }
  ],
  items: [
    {
      id: uuidv4(),
      name: 'Potion of Healing',
      metadata: [
        {
          name: 'Rarity',
          type: 'string',
          value: 'Common',
        },
        {
          name: 'Cost',
          type: 'string',
          value: '50GP'
        }
      ],
      content: `
# Potion of Healing

A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points. Drinking or administering a potion takes an action.
`
    }
  ],
  handouts: [
    {
      id: uuidv4(),
      name: 'Test Handout',
      description: 'Lorem ipsum dolor set amet',
      url: 'https://placekitten.com/200/300'
    }
  ]
};