export interface AdventureCreatureResponse {
  id: string;
  adventureid: string;
  name: string;
  image: string;
  content: string;
  metadata: string;
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
  metadata: string;
}

export interface AdventureResponse {
  creatures: AdventureCreatureResponse[];
  handouts: AdventureHandoutResponse[];
  items: AdventureItemResponse[];
}
