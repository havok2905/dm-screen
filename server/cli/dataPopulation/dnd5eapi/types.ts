export interface ApiReference {
  index?: string;
  level?: number;
  name?: string;
  url?: string;
}

export interface MonsterArmorClass {
  type: string;
  value: number;
}

export interface MonsterProficiencyPartial {
  proficiency?: ApiReference;
  value?: number;
}

export interface Choice {
  choose?: number;
  from?: ApiReference[]; // circular
  desc?: string;
  type?: string;
}

export type ActionType =
  'ability' |
  'magic' |
  'melee' |
  'ranged';

export interface Action {
  action_name?: string;
  count?: number;
  type?: ActionType;
}

export type SuccessType =
  'none' |
  'half' |
  'other';

export interface DC {
  dc_type?: ApiReference;
  dc_value?: number;
  success_type?: SuccessType;
}

export interface Damage {
  damage_dice?: string;
  damage_type?: ApiReference;
}

export interface MonsterAttack {
  damage?: Damage;
  dc?: DC;
  name?: string;
}

export interface MonsterAction {
  actions?: Action;
  action_options?: Choice;
  attacks?: MonsterAttack[];
  attack_bonus?: number;
  damage?: Damage[];
  dc?: DC;
  desc?: string;
  multiattack_type?: string;
  name?: string;
  options?: Choice;
}

export type UsageType =
  'at will' |
  'per day' |
  'recharge after rest' |
  'recharge on roll';

export interface Usage {
  rest_types?: string;
  times?: number;
  type?: UsageType;
}

export interface Spell {
  level?: number;
  name?: string;
  url?: string;
  usage?: Usage;
}

export interface Spellcasting {
  ability?: ApiReference;
  components_required?: string[];
  dc?: number;
  modifier?: number;
  school?: string;
  slots?: Record<string, number>;
  spells?: Spell[];
  usage?: Usage;
}

export interface MonsterSpecialAbilities {
  attack_bonus?: number;
  dc?: DC;
  damage: Damage;
  desc?: string;
  name?: string;
  spellcasting?: Spellcasting;
}

export interface MonsterSenses {
  blindsight?: string;
  darkvision?: string;
  passive_perception?: number;
  tremorsense?: string;
  truesight?: string;
}

export interface MonsterSpeed {
  burrow?: string;
  climb?: string;
  fly?: string;
  swim?: string;
  walk?: string;
}

export type MonsterAlignment =
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

export type MonsterSize =
  'Gargantuan' |
  'Huge' |
  'Large' |
  'Medium' |
  'Small' |
  'Tiny';

export interface MonsterPartial extends ApiReference { }

export interface Monster {
  actions?: MonsterAction[];
  alignments?: MonsterAlignment;
  armor_class?: MonsterArmorClass[];
  challenge_rating?: number;
  charisma?: number;
  condition_immunities?: ApiReference[];
  damage_immunities?: string[];
  damage_resistances?: string[];
  damage_vulnerabilities?: string[];
  constitution?: number;
  desc?: string;
  dexterity?: number;
  hit_dice?: string;
  hit_points?: number;
  hit_points_roll?: string;
  forms?: ApiReference[];
  image?: string;
  index?: string;
  intelligence?: number;
  languages?: string;
  legendary_actions?: MonsterAction[];
  proficiencies?: MonsterProficiencyPartial[];
  proficiency_bonus: number;
  name?: string;
  reactions: MonsterAction[];
  senses?: MonsterSenses;
  size?: MonsterSize;
  special_abilities?: MonsterSpecialAbilities[];
  speed?: MonsterSpeed;
  strength?: number;
  subtype?: string;
  type?: string;
  url?: string;
  wisdom?: number;
  xp?: number;
}

export interface Monsters {
  count: number;
  results: MonsterPartial[];
}
