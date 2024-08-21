export type SourceKinds = 'dnd5eapi';

export interface IThirdPartyDndAdapter {
  getEquipmentItems(): Promise<EquipmentItem[]>;
  getMagicItems(): Promise<MagicItem[]>;
  getMonsters(): Promise<Monster[]>;
  getSpells(): Promise<SpellItem[]>;
}

export interface AC {
  type: string;
  value: number;
}

export interface Action {
  damage: Damage[];
  dc: DC | null;
  description: string;
  multiattackType: string;
  name: string;
}

export interface Damage {
  damageDice: string;
  damageType: string;
}

export interface DC {
  dcType: Ability;
  dcValue: number;
  successType: SuccessType;
}

export type Rarity =
  'artifact' |
  'common' |
  'legendary' |
  'rare' |
  'uncommon' |
  'varies' |
  'very rare' |
  '';

export interface MagicItem {
  category: string;
  description: string;
  name: string;
  rarity: Rarity;
  variant: boolean;
  variants: string[];
}

export interface EquipmentItem {
  armorCategory: string;
  armorClass?: EquipmentArmorClass;
  capacity: string;
  categoryRange: string;
  contents: EquipmentContent[];
  damage?: Damage;
  description: string;
  equipmentCategory: string;
  gearCategory: string;
  name: string;
  properties: string[];
  range?: EquipmentRange;
  speed?: VehicleSpeed;
  strMinimum: number;
  stealthDisadvantage: boolean;
  throwRange?: EquipmentRange;
  twoHandedDamage?: Damage;
  vehicleCategory: string;
  weaponCategory: string;
  weaponRange: string;
}

export interface EquipmentArmorClass {
  base: number;
  dexBonus: boolean;
  maxBonus: number;
}

export interface EquipmentContent {
  item: string;
  quantity: number;
}

export interface EquipmentRange {
  long?: number;
  normal?: number;
}

export interface VehicleSpeed {
  quantity: number;
  unit: string;
}

export interface Proficiency {
  ability: Ability;
  skill: Skill;
  value: number;
}

export interface Senses {
  blindsight: string;
  darkvision: string;
  passivePerception: number;
  tremorsense: string;
  truesight: string;
}

export interface Speed {
  burrow: string;
  climb: string;
  fly: string;
  swim: string;
  walk: string;
}

export interface Spell {
  level: number;
  name: string;
  usage: Usage | null;
}

export interface SpellAreaOfEffect {
  size: number;
  type: 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube' | '';
}

export interface SpellDamage {
  damageType: string;
  damageAtSlotLevel?: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '7': string;
    '8': string;
    '9': string;
  }
}

export interface SpellItem {
  areaOfEffect?: SpellAreaOfEffect;
  attackType: string;
  castingTime: string;
  classes: string[];
  components: string[];
  concentration: boolean;
  damage?: SpellDamage;
  dc?: DC;
  description: string;
  duration: string;
  higherLevel: string;
  level: number;
  material: string;
  name: string;
  range: string;
  ritual: boolean;
  school: string;
  subclasses: string[];
}

export interface Spellcasting {
  ability: Ability;
  componentsRequired: string[];
  dc: DC;
  modifier: number;
  spellList: SpellList;
  slots: Record<string, number>;
  spells: Spell[];
  usage: Usage | null;
}

export interface Usage {
  restTypes: string[];
  times: number;
  type: UsageType;
}

export type SpellList =
  'artificer' |
  'bard' |
  'cleric' |
  'druid' |
  'paladin' |
  'ranger' |
  'sorcerer' |
  'warlock' |
  'wizard' |
  '';

export type SpellSchool =
  'abjuration' |
  'conjuration' |
  'divination' |
  'enchantment' |
  'evocation' |
  'illusion' |
  'necromancy' |
  'transmutation';

export type Skill =
  'acrobatics' |
  'animal handling' |
  'arcana' |
  'athletics' |
  'deception' |
  'history' |
  'insight' |
  'intimidation' |
  'investigation' |
  'medicine' |
  'nature' |
  'perception' |
  'performance' |
  'persuasion' |
  'religion' |
  'sleight of hand' |
  'survival' |
  'stealth';

export type Ability =
  'charisma' |
  'constitution' |
  'dexterity' |
  'intelligence' |
  'strength' |
  'wisdom' |
  '';

export type SuccessType =
  'none' |
  'half' |
  'other' |
  '';

export type UsageType =
  'at will' |
  'per day' |
  'recharge after rest' |
  'recharge on roll' |
  '';

export type Alignment =
  'chaotic good' |
  'chaotic evil' |
  'chaotic neutral' |
  'lawful good' |
  'lawful evil' |
  'lawful neutral' |
  'neutral' |
  'neutral good' |
  'neutral evil' |
  'unaligned';

export type Size =
  'gargantuan' |
  'huge' |
  'large' |
  'medium' |
  'small' |
  'tiny';

export type CR =
  '0' |
  '1/8' |
  '1/4' |
  '1/2' |
  '1' |
  '2' |
  '3' |
  '4' |
  '5' |
  '6' |
  '7' |
  '8' |
  '9' |
  '10' |
  '11' |
  '12' |
  '13' |
  '14' |
  '15' |
  '16' |
  '17' |
  '18' |
  '19' |
  '20' |
  '21' |
  '22' |
  '23' |
  '24' |
  '25' |
  '26' |
  '27' |
  '28' |
  '29' |
  '30';

export interface Monster {
  actions: Action[];
  alignment: Alignment;
  ac: AC;
  cr: CR;
  conditionImmunities: string[];
  damageImmunities: string[];
  damageResistances: string[];
  damageVulnerabilities: string[];
  description: string;
  features: Action[];
  hitDice: string;
  hp: number;
  hpRoll: string;
  languages: string;
  legendaryActions: Action[];
  name: string;
  proficiencies: Proficiency[];
  proficiencyBonus: number;
  reactions: Action[];
  senses: Senses;
  size: Size;
  speed: Speed;
  stats: {
    charisma: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    strength: number;
    wisdom: number;
  };
  subtype: string;
  type: string;
  xp: number | null;
}
