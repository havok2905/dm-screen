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
