/* istanbul ignore file */

export const BLINDED = `
#### Blinded

- A blinded creature can't see and automatically fails any ability check that requires sight.
- Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.
`;

export const CHARMED = `
#### Charmed

- A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.
- The charmer has advantage on any ability check to interact socially with the creature.
`;

export const DEAFENED = `
#### Deafened

- A deafened creature can't hear and automatically fails any ability check that requires hearing.
`;

export const EXHAUSTION = `
#### Exhaustion

Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An effect can give a creature one or more levels of exhaustion, as specified in the effect's description.

##### Exhaustion Effects 

| Level | Effect |
| ----- | ------ |
| 1     | Disadvantage on ability checks |
| 2     | Speed halved |
| 3     | Disadvantage on attack rolls and saving throws |
| 4     | Hit point maximum halved |
| 5     | Speed reduced to 0 |
| 6     | Death |

If an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect's description.

A creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.

An effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.

Finishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink.
`;

export const FRIGHTENED = `
#### Frightened

- A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.
- The creature can't willingly move closer to the source of its fear.
`;

export const GRAPPLED = `
#### Grappled

- A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.
- The condition ends if the grappler is incapacitated (see the condition).
- The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell.
`

export const INCAPACITATED = `
#### Incapacitated

- An incapacitated creature can't take actions or reactions.
`;

export const INVISIBLE = `
#### Invisible

- An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves.
- Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage.
`;

export const PARALYZED = `
#### Paralyzed

- A paralyzed creature is incapacitated (see the condition) and can't move or speak.
- The creature automatically fails Strength and Dexterity saving throws.
- Attack rolls against the creature have advantage.
- Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.
`;

export const PETRIFIED = `
#### Petrified

- A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.
- The creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.
- Attack rolls against the creature have advantage.
- The creature automatically fails Strength and Dexterity saving throws.
- The creature has resistance to all damage.
- The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.
`;

export const POISONED = `
#### Poisoned

- A poisoned creature has disadvantage on attack rolls and ability checks.
`

export const PRONE = `
#### Prone

- A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.
- The creature has disadvantage on attack rolls.
- An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.

`;

export const RESTRAINED = `
#### Restrained

- A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.
- Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.
- The creature has disadvantage on Dexterity saving throws.
`

export const STUNNED = `
#### Stunned

- A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.
- The creature automatically fails Strength and Dexterity saving throws.
- Attack rolls against the creature have advantage.
`

export const UNCONSCIOUS = `
#### Unconscious

- An unconscious creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings
- The creature drops whatever it's holding and falls prone.
- The creature automatically fails Strength and Dexterity saving throws.
- Attack rolls against the creature have advantage.
- Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.
`;
