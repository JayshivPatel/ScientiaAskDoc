import { Expose, Type } from 'class-transformer'

export class UserDetails {
  login: string
  email: string
  firstname: string
  lastname: string

  @Expose({ name: 'role_in_department' })
  roleInDepartment: string

  @Type(() => Module)
  modules: Module[]
}

export class ModuleStaff {
  login: string
  email: string
  firstname: string
  lastname: string
  department: string
  cid: string
}

export class Module {
  code: string
  title: string
  terms: number[]
  level?: number

  @Type(() => ModuleStaff)
  staff: ModuleStaff[]
}

export class Exercise {
  number: number
  title: string
  type: string

  @Expose({ name: 'module_code' })
  moduleCode?: string
  moduleTitle?: string

  @Expose({ name: 'submission_type' })
  submissionType: string

  @Type(() => Date)
  @Expose({ name: 'start_date' })
  startDate: Date

  @Expose({ name: 'end_date' })
  @Type(() => Date)
  endDate: Date
}

export class ModuleWithExercises {
  code: string
  title: string
  terms: number[]
  staff: string[]

  @Type(() => Exercise)
  exercises: Exercise[]
}

/* A track is a list of non-overlapping exercises */
export type Track = Exercise[]

/* A track map associates a list of tracks with a module code */
export type TrackMap = { [code: string]: Track[] }

/**
 * NOTE: Terms from the backend have the following shape.
 * { name: string, start: Date, end: Date, weeks: number }
 * The start date's always a Monday and the end date's always a Friday
 * The weeks holds a count of the number of mondays in the term
 */
export type Term = {
  name: string
  start: Date
  end: Date
  weeks: number
}

export interface ResourceCreate {
  title: string
  category: string | null
  file?: File
  visible_after: Date
  type: string
  path: string
}

interface Material {
  name: string
  url: string
}

export interface RequiredSubmission {
  name: string
  max_size: number
  suffix: string
  submitted: boolean
}

interface ExerciseOwner {
  shortcode: string
  email: string
  name: string | null
}

export class ExerciseMaterials {
  owner: ExerciseOwner
  spec: Material

  @Expose({ name: 'data_files' })
  dataFiles: Material[]

  @Expose({ name: 'model_answers' })
  modelAnswers: Material[]

  @Expose({ name: 'hand_ins' })
  handIns: RequiredSubmission[]
}

export class SubmittedFile {
  id: number
  size: number

  @Type(() => Date)
  timestamp: Date

  @Expose({ name: 'target_submission_file_name' })
  targetSubmissionFileName: string
}
