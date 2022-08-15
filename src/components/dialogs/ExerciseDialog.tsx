import { Label } from '@radix-ui/react-select'
import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { BoxArrowUpRight, CheckLg, Envelope, FileEarmark, Upload } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise, ExerciseMaterials, Module, SubmittedFile } from '../../constants/types'
import { useExercises } from '../../lib/exercises.service'
import { currentShortYear } from '../../lib/utilities.service'
import {
  ModulePill,
  ResourceLink,
  SpecLink,
  TrashButton,
  UploadButton,
  UploadWrapper,
} from '../../styles/exerciseDialog.style'
import Dialog from './Dialog'
import FileUpload from './FileUpload'

const ExerciseDialog = ({
  open,
  onOpenChange,
  exercise,
  module,
}: {
  open: boolean
  onOpenChange: (_: boolean) => void
  exercise: Exercise
  module: Module
}) => {
  const { getExerciseMaterials, deleteFile, submitFile } = useExercises()

  const [exerciseMaterials, setExerciseMaterials] = useState<ExerciseMaterials | null>(null)
  const { owner, spec, dataFiles, modelAnswers, handIns } = exerciseMaterials || {}
  const [timeSpent, setTimeSpent] = useState('')

  const EXERCISE_DURATIONS = ['0-1 hours', '1-10 hours', '11-20 hours', '20+ hours']

  useEffect(() => {
    // TODO: get user's year group
    getExerciseMaterials({
      academicYear: currentShortYear(),
      yearGroup: 'c1',
      exerciseId: exercise.number,
      setExerciseMaterials,
    })
  }, [exercise])

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const displayTimestamp = (date: Date | string) =>
    formatInTimeZone(date, LONDON_TIMEZONE, 'E d LLL yyyy, h:mm aaa zzz')

  return (
    exerciseMaterials && (
      <Dialog {...{ open, onOpenChange }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>
            {exercise.type}: {exercise.title}
          </h3>
          {owner && (
            <address style={{ float: 'right' }}>
              <a
                title={
                  'Email the exercise owner' +
                  (owner.name ? `: ${owner.name} (${owner.shortcode})` : '')
                }
                href={`mailto:${owner.email}`}
              >
                <Envelope size={24} />
              </a>
            </address>
          )}
        </div>
        <ModulePill>
          {exercise.moduleCode}: {module.title}
        </ModulePill>
        {/* TODO: spec button placement not final - temporarily placed in centre. */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {spec && (
            <SpecLink target="_blank" href={spec.url}>
              <BoxArrowUpRight
                style={{ marginRight: '0.5rem', fill: 'inherit', float: 'left' }}
                size={16}
                fill="#1B1B18"
              />
              View specification
            </SpecLink>
          )}
        </div>
        {dataFiles!.length > 0 && (
          <div>
            <h4>Data files</h4>
            {dataFiles!.map((file, index) => (
              <li>
                <ResourceLink key={index} target="_blank" href={file.url}>
                  {file.name}
                </ResourceLink>
              </li>
            ))}
          </div>
        )}
        {modelAnswers!.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Model answers</h4>
            <ul>
              {modelAnswers!.map((file, index) => (
                <li>
                  <ResourceLink key={index} target="_blank" href={file.url}>
                    {file.name}
                  </ResourceLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        {handIns!.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Submission</h4>
            <p style={{ fontSize: '14px', color: '$sand8' }}>
              Deadline: {displayTimestamp(exercise.endDate)}
            </p>
            <UploadWrapper>
              {handIns!.map((handIn, index) => (
                <FileUpload key={index} handIn={handIn} />
              ))}
            </UploadWrapper>
            <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
              By uploading, you agree that this is your own, unaided work.
            </p>

            <div style={{ display: 'flex', fontSize: '0.8rem', marginTop: '1rem' }}>
              <label htmlFor="exercise-duration">
                How many hours did this coursework take you?
              </label>
              <select
                value={timeSpent}
                onChange={(event) => setTimeSpent(event.target.value)}
                style={{ display: 'inline', marginLeft: '0.5rem' }}
                name="exercise-duration"
              >
                <option value="">Select...</option>
                {EXERCISE_DURATIONS.map((duration, index) => (
                  <option key={index} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Dialog>
    )
  )
}

export default ExerciseDialog
