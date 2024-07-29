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
  proficiencies?: MonsterProficiencyPartial[];
  name?: string;
  senses?: MonsterSenses;
  size?: MonsterSize;
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
