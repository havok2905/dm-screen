import { MetaDataType } from '@core/types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { CREATURES_PATH } from '../../../routes';
import { MarkdownEntityCreatePage } from '../components/MarkdownEntityCreatePage';
import { useCreateCreature } from '../../../hooks';

const template = `# Creature name

*large beast, unaligned*

**Armor Class** 10 (natural armor)

**Hit Points** 10

**Speed** 30ft.

**XP** 0

| STR | DEX | CON | INT | WIS | CHA |
| --- | --- | --- | --- | --- | --- |
| 10  | 10  | 10  | 10  | 10  | 10  |
| +0  | +0  | +0  | +0  | +0  | +0  |

**Skills** perception +2

**Saves** WIS +2

**Senses** passive Perception 12

**Condition Immunities** Poisoned

**Damage Immunities** Cold

**Damage Resistances** Fire

**Damage Vulnerabilities** Thunder

**Languages** --

**Challenge** 0

**Proficiency Bonus** 2

---

## Features

**Legendary Resistance (3/Day).** If the dragon fails a saving throw, it can choose to succeed instead.

---

## Actions

**Multiattack.** The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.

**Bite.** *Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. Hit: (2d10 + 8) piercing damage plus (2d6)fire damage.

**Claw.** *Melee Weapon Attack:* +14 to hit, reach 5 ft., one target. Hit: (2d6 + 8) slashing damage.

**Tail.** *Melee Weapon Attack:* +14 to hit, reach 15 ft., one target. Hit: (2d8 + 8) bludgeoning damage.

**Frightful Presence.** Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.

**Fire Breath (Recharge 5-6).** The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much damage on a successful one.

---

## Legendary Actions

Can take 3 Legendary Actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature's turn. Spent legendary actions are regained at the start of each turn.

**Detect.** The dragon makes a Wisdom (Perception) check.

**Tail Attack.** The dragon makes a tail attack.

**Wing Attack (Costs 2 Actions).** The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.
`;

const initialMetaData = [
  {
    name: 'AC',
    type: 'number' as MetaDataType,
    value: 0
  },
  {
    name: 'CR',
    type: 'string' as MetaDataType,
    value: '0'
  },
  {
    name: 'HP',
    type: 'number' as MetaDataType,
    value: 0
  },
  {
    name: 'Type',
    type: 'string' as MetaDataType,
    value: 'Beast'
  }
];

export const CreateCreaturePage = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(CREATURES_PATH);
  }, [
    navigate
  ]);

  const { mutate } = useCreateCreature(onSuccess);

  return(
      <MarkdownEntityCreatePage
        backToLinkPath={CREATURES_PATH}
        backToLinkString="Back to creatures"
        createIsError={false}
        createIsErrorText="There was an error saving this creature"
        initialMetaData={initialMetaData}
        saveButtonText="Save creature"
        template={template}
        titleString="Create New Creature"
        updateFunction={mutate} />
  );
};
