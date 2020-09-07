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
  path?: string;
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

export interface TimelineEvent {
  title: string;
  id: number;
  prefix: string; 
	assessment: string;
	status: string;
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