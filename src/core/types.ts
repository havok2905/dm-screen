export interface MetaData {
  name: string;
  type: 'string' | 'number';
  value: string | number;
}

export interface MarkdownEntity {
  content: string;
  id: string;
  image?: string;
  metadata: MetaData[];
  name: string;
}

export interface Handout {
  description: string;
  id: string;
  name: string;
  url: string;
  isShowcaseView?: boolean;
}

export interface Adventure {
  name: string;
  notes: string; // as markdown
  system: string;
  creatures: MarkdownEntity[];
  handouts: Handout[];
  items: MarkdownEntity[];
}

export interface Player {
  ac: number;
  characterName: string;
  id: string;
  name: string;
}

export enum EntityType {
  CREATURE = 'creature',
  PLAYER = 'player'
}

export enum VisibilityState {
  HIDDEN = 'hidden',
  ON = 'on',
  REMOVED = 'removed'
}

export interface InitiativeItem {
  entityId: string;
  entityType: EntityType;
  id: string;
  imageSrc?: string;
  name: string;
  resourceA: number;
  resourceB: number;
  sortValue: number;
  visibilityState: VisibilityState;
}

export interface InitiativeOrderState {
  currentId: string;
  items: InitiativeItem[];
  round: number;
}
