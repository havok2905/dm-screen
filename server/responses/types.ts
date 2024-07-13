export interface MetadataResponse {
  name: string;
  type: 'string' | 'number';
  value: string | number;
}

export interface AdventureCreatureResponse {
  id: string;
  adventureid: string;
  name: string;
  image: string;
  content: string;
  metadata: MetadataResponse[];
}

export interface AdventureHandoutResponse {
  id: string;
  adventureid: string;
  name: string;
  description: string;
  url: string;
}

export interface AdventureItemResponse {
  id: string;
  adventureid: string;
  name: string;
  image: string;
  content: string;
  metadata: MetadataResponse[];
}

export interface AdventureResponse {
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

export interface InitiativeOrderItemResponse {
  entityId: string;
  entityType: EntityType;
  id: string;
  imageSrc: string;
  name: string;
  resourceA:  number;
  resourceB: number;
  sortValue: number;
  visibilityState: 'on' | 'hidden' | 'removed';
}

export interface InitiativeResponse {
  initiative: {
    id: string;
    adventureid: string;
    initiativeOrderState: {
      currentId: string;
      items: InitiativeOrderItemResponse[];
      round: number;
    };
  }
}
