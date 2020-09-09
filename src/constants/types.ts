export enum Term {
  AUTUMN,
  SPRING,
  SUMMER,
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
  downloads: number;
  index: number;
  path: string;
  visible_after: Date;
  thumbnail?: string;
}

export interface Module {
  title: string;
  code: string;
  image: string;
  terms: Term[];
  progressStatus: ProgressStatus;
  progressPercent: number;
  content: string;
};

export enum ProgressStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

export type idBooleanMap = { [key: number]: boolean };