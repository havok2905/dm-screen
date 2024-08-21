export interface ApiReference {
  index?: string;
  level?: number;
  name?: string;
  url?: string;
}

export interface EquipmentItemPartial extends ApiReference {}

export interface ApiItemBase {
  index?: string;
  name?: string;
}

export interface Equipment {
  count: number;
  results: EquipmentItemPartial[];
}

export interface EquipmentItem extends ApiItemBase{ 
  armor_category?: string;
  armor_class?: EquipmentArmorClass;
  capacity?: string;
  category_range?: string;
  contents?: Content[];
  damage?: Damage;
  desc?: string[];
  equipment_category?: ApiReference;
  gear_category?: ApiReference;
  properties?: ApiReference[];
  range?: Range;
  speed?: VehicleSpeed;
  str_minimum?: number;
  stealth_disadvantage?: boolean;
  throw_range?: Range;
  two_handed_damage?: Damage;
  vehicle_category?: string;
  weapon_category?: string;
  weapon_range?: string;
}

export interface EquipmentArmorClass {
  base?: number;
  dex_bonus?: false;
  max_bonus?: number;
}

export interface VehicleSpeed {
  quantity?: number;
  unit?: string;
}

export interface Range {
  long?: number;
  normal?: number;
}

export interface Content {
  item?: ApiReference;
  quantity?: number;
}

export interface MagicItemPartial extends ApiReference {}

export interface MagicItems {
  count: number;
  results: MagicItemPartial[];
}

export interface MagicItem extends ApiItemBase {
  desc?: string[];
  equipment_category?: ApiReference;
  level?: number;
  rarity?: {
    name?: Rarity;
  };
  url?: string;
  variant?: boolean;
  variants?: ApiReference[];
}

export type Rarity =
  'Artifact' |
  'Common' |
  'Legendary' |
  'Rare' |
  'Uncommon' |
  'Varies' |
  'Very Rare';

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

export interface Spells {
  count: number;
  results: Spell[];
}

export interface SpellDamage {
  damage_type?: ApiReference;
  damage_at_slot_level?: {
    '1'?: string;
    '2'?: string;
    '3'?: string;
    '4'?: string;
    '5'?: string;
    '6'?: string;
    '7'?: string;
    '8'?: string;
    '9'?: string;
  }
}

export interface SpellAreaOfEffect {
  size?: number;
  type?: 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube' | '';
}

export interface SpellItem extends ApiItemBase {
  area_of_effect?: SpellAreaOfEffect;
  attack_type?: string;
  casting_time?: string;
  classes?: ApiReference[];
  components?: string[];
  concentration?: boolean;
  damage?: SpellDamage;
  dc?: DC;
  desc?: string[];
  duration?: string;
  higher_level?: string[];
  level?: number;
  material?: string;
  range?: string;
  ritual?: boolean;
  school?: ApiReference;
  subclasses?: ApiReference[];
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

export interface Monster extends ApiItemBase {
  actions?: MonsterAction[];
  alignment?: MonsterAlignment;
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
  intelligence?: number;
  languages?: string;
  legendary_actions?: MonsterAction[];
  proficiencies?: MonsterProficiencyPartial[];
  proficiency_bonus: number;
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
