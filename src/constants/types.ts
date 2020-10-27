export type Term =
  | "Autumn"
  | "Christmas"
  | "Summer"
  | "Easter"
  | "Spring"
  | "Jun-Sept"

export interface Folder {
  title: string
  id: number
}

export interface GroupFormationMemberInfo {
  username: string,
  name: string
  classEnrolled: string,
  role: string,
  signatureTime: Date | undefined
}

export interface StudentInfo {
  "username": string,
  "firstname": string,
  "lastname": string,
  "class": string
}

export interface Resource {
  title: string
  type: FileType
  tags: string[]
  folder: string
  id: number
  downloads: number
  index: number
  path: string
  visible_after: Date
  thumbnail?: string
}

export interface ResourceUploadRequirement {
  id: number
  title: string
  allowedSuffixes: string[]
  maxSize: number,
  uploadedFile?: ResourceUploadStatus 
}

export interface ResourceUploadStatus {
  title: string
  suffix: string
  checksum: string
  size: number,
  timestamp: Date,
  url: string
}

export interface BasicResource {
  title: string
  type: FileType
  tags: string[]
  folder: string
  id: number
  path: string
}

export interface Module {
  title: string
  code: string
  canManage?: boolean
  hasMaterials?: boolean
  terms: Term[]
  progressStatus: ProgressStatus
  progressPercent: number
  content: string
  subscriptionLevel: SubscriptionLevel
}

export interface TimelineEvent {
  title: string
  id: number
  prefix: string
  assessment: "unassessed" | "assessed" | "required" | "group" | "exam"
  status: "due" | "unreleased" | "late" | "missed" | "complete"
  owner: string
  moduleCode: string
  startDate: Date
  endDate: Date
}

export type SubmissionType = "electronic" | "hardcopy" | "other"

export type FileType = "pdf" | "video" | "file" | "link"

export type ExerciseData = TimelineEvent & {
  maximumMark: number
  submissionType: SubmissionType
}

export type ExerciseCreation = {
  id: number
  startDate: Date
  endDate: Date
  title: string
  alternativeExercise: boolean
  assessmentType: AssessmentType
  assessment: "unassessed" | "individual" | "groups"
  hardcopyDue?: Date
  electronicDue?: Date
  provisionOfMarkingSchemaFile: boolean
  provisionOfSpec: boolean
  maximumMark: number
  weightWithinModule: "average"
  provisionOfSampleAnswerFile?: Date
}

export enum AssessmentTypeSeveralDays {
  TUTORIAL = "tutorial",
  COURSEWORK = "coursework",
  COMPUTER_BASED_TUTORIAL = "computer-based tutorial",
  COMPUTER_BASED_COURSEWORK = "computer-based coursework",
  LABORATORY = "laboratory",
  MMT = "mmt",
  PMT = "pmt",
  PPT = "ppt",
  REPORT = "report",
  ESSAY = "essay",
  PROJECT = "project",
}

export enum AssessmentTypeOneDay {
  TEST = "test",
  ONLINE_TEST = "online-test",
  RESIT_TEST = "resit-test",
  RESIT_ONLINE_TEST = "resit-online-test",
  EXAM_QUESTION = "exam-question",
}

export enum AssessmentTypeSpecialisedActivity {
  GROUP_FORMATION = "group-formation"
}

export type AssessmentType = AssessmentTypeOneDay
                           | AssessmentTypeSeveralDays
                           | AssessmentTypeSpecialisedActivity

export interface CalendarEvent {
  summary: string
  description: string
  location: string
  start: Date
  end: Date
  catorgory: string
}

export enum ProgressStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export type IdBooleanMap = { [key: number]: boolean }

export type ThumbnailMap = { [key: string]: string }

export enum URLError {
  EmptyURL = "empty_url",
  InvalidURL = "invalid_url"
}

export enum LinkTitleError {
  EmptyTitle = "empty_title",
  DuplicateTitle = "invalid_url"
}

export type SubscriptionLevel = 1 | 2 | 3

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};