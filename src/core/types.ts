export interface MetaData {
  name: string;
  type: 'string' | 'number';
  value: string | number;
}

export interface MarkdownEntity {
  content: string;
  id: string;
  metadata: MetaData[];
  name: string;
}

export interface Handout {
  description: string;
  id: string;
  name: string;
  url: string;
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

export interface InitiativeItem {
  entityId: string;
  entityType: 'creature' | 'player';
  id: string;
  name: string;
  resourceA: number;
  resourceB: number;
  sortValue: number;
}

export interface InitiativeOrder {
  currentId: string;
  items: InitiativeItem[];
  round: number;
}