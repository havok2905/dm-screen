export interface MetadataResponse {
  name: string;
  type: 'string' | 'number';
  value: string | number;
}

export interface MarkdownEntityResponse {
  id: string;
  adventureid: string;
  name: string;
  image: string;
  content: string;
  metadata: MetadataResponse[];
}

export interface AdventureCreatureResponse extends MarkdownEntityResponse { }

export interface AdventureHandoutResponse {
  id: string;
  adventureid: string;
  name: string;
  description: string;
  url: string;
}

export interface AdventureItemResponse extends MarkdownEntityResponse { }

export interface AdventureResponse {
  description: string;
  id: string;
  name: string;
  notes: string;
  system: string;
  creatures?: AdventureCreatureResponse[];
  handouts?: AdventureHandoutResponse[];
  items?: AdventureItemResponse[];
}

export type AdventuresResponse = {
  adventures: AdventureResponse[];
}

export enum EntityType {
  CREATURE = "creature",
  PLAYER = "player"
}

export enum VisibilityState {
  HIDDEN = 'hidden',
  ON = 'on',
  REMOVED = 'removed'
}

export interface InitiativeOrderItemResponse {
  entityId: string;
  entityType: EntityType;
  gmOnly: boolean;
  id: string;
  imageSrc: string;
  name: string;
  resourceA:  number;
  resourceB: number;
  sortValue: number;
  visibilityState: VisibilityState;
}

export interface InitiativeResponse {
  id: string;
  adventureid: string;
  initiativeOrderState: {
    currentId: string;
    items: InitiativeOrderItemResponse[];
    round: number;
  };
}

export interface ItemResponse extends MarkdownEntityResponse { }
