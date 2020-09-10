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
  type: "pdf" | "video" | "file" | "link";
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
  can_manage: boolean;
  has_materials: boolean;
  terms: Term[];
  progressStatus: ProgressStatus;
  progressPercent: number;
  content: string;
}

export interface TimelineEvent {
  title: string;
  id: number;
  prefix: string;
  assessment: "unassessed" | "assessed" | "required" | "group" | "exam";
  status: "due" | "unreleased" | "late" | "missed" | "complete";
  owner: string;
  moduleCode: string;
  startDate: Date;
  endDate: Date;
}

export enum ProgressStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

export type IdBooleanMap = { [key: number]: boolean };
