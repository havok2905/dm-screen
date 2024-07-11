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
