export enum Term {
  AUTUMN,
  SPRING,
  SUMMER
}

export interface Folder {
  title: string;
  id: number;
}

export interface Resource {
  title: string;
  type: string;
  tags: string[];
  folder: string;
  id: number;
  path?: string;
  thumbnail?: string;
}