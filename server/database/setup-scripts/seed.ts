import {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem
} from '../models';

(async () => {
  await Adventure.create(
    {
      id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
      name: 'The Embroidermancer',
      system: 'D&D 5e (2014)',
      notes: `# The Embroidermancer

## Premise

The players arrive at an old woman's house on the outskirts of Waterdeep. The party has been hired by the local guard to pay a visit to the owner of the house, with the goal of investigating reports of disappearances in the area. Upon entering the premises, the players are transformed into yarn versions of themselves and shrunk down to the size of dolls, now at the mercy of an evil knitting mage. The players must make their way through The Embroidermancer's lair to find a way to restore themselves to their normal size and escape.

## The Embroidermancer

The Embroidermancer is a longtime resident of the Waterdavian region, having now lived there for hundreds of years. Few have visited her cottage, but those who have found themselves at the mercy of the wicked mage. For generations, she has turned visitors into toys for her pets, turning all who dare enter into dolls of yarn. These incidents were, however, quite rare. Now, Waterdeep's borders have expanded into her forest, bringing with them solicitors, tax collectors, and more to her front doors and to their doom. At first, the occurrences were regarded as just urban legend, but that has begun to change.

## The Yarn Spell

Upon entering the cottage, the players will be turned into walking dolls of yarn. This will reduce the player's sizes to tiny and grant them a weakness to fire damage. The affected players cannot deal damage to The Embroidermancer in this state. All spells and attacks are rendered useless against her. This can only be reversed through the use of a Greater Restoration spell.

## The Cottage

![emboridermancer-map](/emboridermancer-map.png)

### A: The Porch

> A large double set of wooden doors are flanked by a sprawling mahogany porch. Etched on the doors are snaking stems topped with crowns of six leaves, stretching out from two bundles of thick roots. Two large door knockers made of brass hang at eye level. A number of goats and sheep can be seen grazing in the yard out front.

A nature check of DC 15 reveals this is madder, a natural dye in yarn making.

The door is locked and may be picked by a DC 13 sleight of hand check with thieves tools. The door has 10 HP and an AC of 10. Knocking on the door, or causing it damage, will only serve to alert The Embroidermancer's kitten of the players' presence.

### B: The Living Room

> Upon stepping through the front door, the room, illuminated by the warm glow of the fireplace, begins to enlarge. The tall bookcases on the far right side tower above you and the chairs and tables become as if monolithic buildings. Looking down at your hands, they appear to now be made of yarn. The living room of this humble cottage is now a vast field before you, seemingly empty of people. Yet, echoing through the halls, you hear the high pitched cackling of an old woman.

A vat of red dye is bubbling near the fire, just beginning to cool. It emits a sweet and earthy smell, only touched with the slight stench of rot. Drinking the dye is extremely dangerous. Make any player that consumes it make a DC 15 CON saving throw. On failure, the player takes 1d6 poison damage.

Have the players roll a perception check against the Playful Kitten's stealth. Upon success, they will hear the quiet meows of the kitten waking up on a pillow in the far corner of the room. Or, if the players knocked before entering the cottage, the kitten will have hidden under the table. If gone unnoticed, the kitten will get a surprise round on the players as it tries to roughly play with them. The kitten will attempt to chase and stalk the players throughout the cottage.

There is a Rug of Smothering underneath the table and chairs. If stepped on by the players, it will attempt to grapple them. The rug will only be hostile while stepped on.

In the Chest:

- 10 Balls of Yarn
- 4 Double Sided Knitting Needles
- 1 Dagger
- 2 Wool Hats
- 22 GP
- 15 SP
- 85 CP

### C: The Bedroom

> Hovering over the bed in a throne of intertwined knitting needles and yarn is a decrepit old woman, ancient, and cast in shadow. Upon seeing you enter her bedroom, she breaks out in uncontrollable laughter, never ceasing her lightning fast knitting.

Players Are Yarn Dolls: The woman will give you no help or advice, instead relishing in your confusion and thanking you for keeping her new kitten well entertained. If the players linger, she will absentmindedly begin to cast cantrips at the players, toying with them.

Players Are No Longer Yarn Dolls: The woman will immediately become hostile and attack on sight, now overtaken with an uncontrollable fury.

In the Chest:

- 5 Balls of Yarn
- 2 Sets of Robes

### D: The Study

> The study before you reeks of litter and fish with deep shadows cutting between the rows of barrels and crates along the back wall. Next to the crates is a wood desk, littered with papers and scrolls. As you step foot inside, four spectral hands snake up from the floorboards below. They slither along the floors, each slipping inside of a crudely made sock puppet; A wizard with a patchy hat, an ape, and a red tiefling with a dangling tail of yarn.

3 Spectral Sock Puppets will attempt to force you out of the study and will instantly be hostile towards the players. They will not, however, leave the study. They are magically bound to the room.

On the Desk:

- 1 Scroll of Greater Restoration

In the Crates and Barrels:

- 50lbs of Kitty Litter
0 20lbs of Kitten Food
- 30lbs of Yarn
- Various Assorted Spell Components

In the Floor Storage Door:

- 20 Bottles of Red Wine
- 485 GP
- 312 SP
- 1045 CP
- 12 Human Skeletons
- 12 Crates of Yarn
`
    },
    {
      fields: [
        'id',
        'name',
        'system',
        'notes'
      ]
    },
  );

  await AdventureCreature.create(
    {
      id: 'dcc17f12-c9ce-4529-994d-dd705e5e5fab',
      adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
      name: 'Playful Kitten',
      image: '/token-playful-kitten.png',
      metadata: JSON.stringify([
        {
          name: 'Type',
          type: 'string',
          value: 'Beast'
        },
        {
          name: 'AC',
          type: 'number',
          value: 15
        },
        {
          name: 'HP',
          type: 'number',
          value: 25
        },
        {
          name: 'CR',
          type: 'string',
          value: '1/2'
        }
      ]),
      content: `
  # Playful Kitten
  
  *Tiny Beast, Chaotic Neutral*
  
  **Armor Class** 15
  
  **Hit Points** 25
  
  **Speed** 40ft, climb 30ft.
  
  | STR | DEX | CON | INT | WIS | CHA |
  | --- | --- | --- | --- | --- | --- |
  |  3  | 16  | 8   | 8   | 10  | 16  |
  | -4  | +3  | -1  | -1  | +0  | +3  |
  
  **Skills Perception** +2, Stealth +7
  
  **Senses** Darkvision 120ft.
  
  **Languages** --
  
  **Challenge** 1/2
  
  **Proficiency Bonus** +2
  
  ---
  
  **Keen Smell.** The playful kitten has advantage on Wisdom (Perception) checks that rely on smell.
  
  ## Actions
  
  **Multitattack.** The playful kitten makes two claw attacks.
  
  **Claw.** *Melee Weapon Attack:* +5 to hit, reach 5ft., one target. Hit: (1d4+3) slashing damage. 
  `
    },
    {
      fields: [
        'id',
        'adventureid',
        'name',
        'image',
        'metadata',
        'content'
      ]
    }
  );

  await AdventureCreature.create(
    {      
      id: '1c230cd3-eab1-40ea-9ac4-32e39b108e6a',
      adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
      name: 'Spectral Sock Puppet',
      image: '/token-sock-puppet.png',
      metadata: JSON.stringify([
        {
          name: 'Type',
          type: 'string',
          value: 'Undead'
        },
        {
          name: 'AC',
          type: 'number',
          value: 13
        },
        {
          name: 'HP',
          type: 'number',
          value: 40
        },
        {
          name: 'CR',
          type: 'string',
          value: '1'
        }
      ]),
      content: `
  # Spectral Sock Puppet
  
  *Small Undead, Chaotic Evil*
  
  **Armor Class** 13
  
  **Hit Points** 40
  
  **Speed** 0ft, Fly (Hover) 40ft.
  
  | STR | DEX | CON | INT | WIS | CHA |
  | --- | --- | --- | --- | --- | --- |
  | 14  | 16  | 11  | 1   | 10  | 10  |
  | +2  | +3  | +1  | -5  | +0  | +0  |
  
  **Condition Immunities** charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained
  
  **Damage Immunities** cold, lightning, necrotic, poison
  
  **Damage Resistances** acid, thunder; bludgeoning, piercing, and slashing from non magical attacks
  
  **Damage Vulnerabilities** fire
  
  **Senses** Blindsight 120ft.
  
  **Languages** --
  
  **Challenge** 1
  
  **Proficiency Bonus** +2
  
  ---
  
  **Static Shock.** When the sock puppet is targeted by a grapple action or executes a grapple action, both the sock puppet and the opposing creature take on a static charge. When an uncharged creature comes within 10ft of a charged creature, that creature takes 1d4+1 lightning damage and the charged creature is no longer charged. 
  
  ## Actions
  
  **Multitattack.** The Spectral Sock Puppet makes two Puppet Thumb Punches.
  
  **Puppet Thumb Punch.** *Melee Weapon Attack:* +4 to hit, reach 5ft., one target. Hit: (1d6+2) bludgeoning damage.
  
  **Puppet Horror Show.** The Spectral Sock Puppet strikes a horrifying pose. Each non-undead creature within 60ft. of the Spectral Sock Puppet that can see it must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the frightened condition on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to this Spectral Sock Puppet's Puppet Horror Show for the next 24 hours. 
  `
    },
    {
      fields: [
        'id',
        'adventureid',
        'name',
        'image',
        'metadata',
        'content'
      ]
    }
  );

  await AdventureCreature.create(
    {      
      id: 'fb0d4fdf-be16-4866-a876-d501efbb2f57',
      adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
      name: 'The Embroidermncer',
      image: '/token-the-embroidermancer.png',
      metadata: JSON.stringify([
        {
          name: 'Type',
          type: 'string',
          value: 'Humanoid'
        },
        {
          name: 'AC',
          type: 'number',
          value: 12
        },
        {
          name: 'HP',
          type: 'number',
          value: 60
        },
        {
          name: 'CR',
          type: 'string',
          value: '5'
        }
      ]),
      content: `
  # The Embroidermancer
  
  *Medium Humanoid, Chaotic Evil*
  
  **Armor Class** 12
  
  **Hit Points** 60
  
  **Speed** 20ft., fly 30ft. She can hover with her yarn needle throne.
  
  | STR | DEX | CON | INT | WIS | CHA |
  | --- | --- | --- | --- | --- | --- |
  | 8   | 10  | 8   | 18  | 15  | 15  |
  | -1  | +0  | -1  | +4  | +2  | +2  |
  
  **Saving Throws** INT +7, WIS +5
  
  **Skills** Arcana +7, History +7
  
  **Languages** Common, Elvish, Infernal, Undercommon
  
  **Condition Immunities** Frightened
  
  **Challenge** 5
  
  **Proficiency Bonus** +3
  
  ---
  
  **Floating Throne.** The Embroidermancer sits upon a throne of yarn and needles, granting The Embroidermancer 30ft. of flying.
  
  **Yarn Spells.** All spells are flavored to be yarn and knitting themed.
  
  **Spellcasting.** This creature is an 8th-level spellcaster. Their spellcasting ability is Intelligence (spell save DC 15; +7 to hit with spell attacks). they have the following spells prepared:
  
  - Cantrips (at will): mage hand, mending, shocking grasp, thorn whip
  - 1st Level (4 slots): catapult, color spray, entangle, mage armor
  - 2nd Level (3 slots): cloud of daggers, enlarge/reduce, rope trick
  - 3rd Level (3 slots): lightning bolt, spirit guardians, tidal wave
  - 4th Level (2 slots): black tentacles, polymorph
  
  ## Actions
  
  **Multiattack.** The Embroidermancer makes two needle attacks.
  
  **Needle.** *Ranged Weapon Attack:* +3 to hit, range 60/120 ft., one target. Hit: (1d4) piercing damage.
  
  ## Lair Actions
  
  On initiative 20, The Embroidermancer takes a lair action to cause one of the following effects; The Embroidermancer can't use the same effect two rounds in a row.
  
  - **Needle Attack.** The Embroidermancer makes a Needle attack.
  - **Puppeteer Dead.** The animate dead spell targets buried corpses underneath the house with long strands of yarn that emit from thin air.
  - **Yarn Web.** If the Tidal Wave spell has been used, this lair action is automatically chosen. The web spell is used on a point where the tidal wave spell landed.
  `
    },
    {
      fields: [
        'id',
        'adventureid',
        'name',
        'image',
        'metadata',
        'content'
      ]
    }
  );

  await AdventureHandout.create({
    id: '60f80ded-b9ce-4804-b81a-f796f0961717',
    adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
    name: 'Embroidermancer Lair Map',
    description: 'Map of the embroidermancer\'s lair',
    url: '/emboridermancer-map.png'
  }, {
    fields: [
      'id',
      'adventureid',
      'name',
      'description',
      'url'
    ]
  });

  await AdventureItem.create({
    id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
    adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
    name: 'Dagger',
    image: '/dagger.png',
    metadata: JSON.stringify([
      {
        name: 'Rarity',
        type: 'string',
        value: 'Common',
      },
      {
        name: 'Cost',
        type: 'string',
        value: '2GP'
      }
    ]),
    content: `# Dagger
  
  *Melee Weapon (Simple, Dagger)*
  
  **Category:** Items
  
  **Damage:** 1d4
  
  **Damage Type:** Piercing
  
  **Properties:** Finesse, Light, Range, Thrown
  
  **Range:** 20/60
  
  **Weight:** 1`
  }, {
    fields: [
      'id',
      'adventureid',
      'name',
      'image',
      'metadata',
      'content'
    ]
  });
})();
