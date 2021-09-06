export type OldTerm =
  | "Autumn"
  | "Christmas"
  | "Summer"
  | "Easter"
  | "Spring"
  | "June-Sept"

export type Term = {
  label: "Autumn" | "Christmas" | "Summer" | "Easter" | "Spring" | "June-Sept"
  start: Date
  end: Date
  weeks: number
}

export interface Folder {
  title: string
  id: number
}

export interface Resource {
  title: string
  course: string
  type: "pdf" | "video" | "file" | "link"
  tags: string[]
  category: string
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
  can_manage?: boolean
  has_materials?: boolean
  terms: OldTerm[]
  content: string
  subscriptionLevel: 1 | 2 | 3
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

export type TimelineEventDict = {
  [module: string]: {
    [id: number]: TimelineEvent
  }
}

export interface CalendarEvent {
  summary: string
  description: string
  location: string
  start: Date
  end: Date
  catorgory: string
}

export interface Feedback {
  id: number
  year: string
  course: string
  course_title: string
  exercise: number
  exercise_title: string
  group: string
}

export type IdBooleanMap = { [key: number]: boolean }

export type ThumbnailMap = { [key: string]: string }

export enum URLError {
  EmptyURL = "empty_url",
  InvalidURL = "invalid_url",
}

export enum TitleError {
  EmptyTitle = "empty_title",
  DuplicateTitle = "duplicate_title",
}

/**
 * A union type contains all keys in type T, whose corresponding value extends type O.
 *
 * i.e. All keys of type O
 */
export type AllKeysExtends<T, O> = {
  [K in keyof T]: T[K] extends O ? K : never
}[keyof T]
