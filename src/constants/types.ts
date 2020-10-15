export type Term =
  | "Autumn"
  | "Christmas"
  | "Summer"
  | "Easter"
  | "Spring"
  | "Jun-Jul"
  | "Aug-Sept"

export interface Folder {
  title: string
  id: number
}

export interface Resource {
  title: string
  type: "pdf" | "video" | "file" | "link"
  tags: string[]
  folder: string
  id: number
  downloads: number
  index: number
  path: string
  visible_after: Date
  thumbnail?: string
}

export interface BasicResource {
  title: string
  type: "pdf" | "video" | "file" | "link"
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