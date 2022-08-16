import { formatInTimeZone } from 'date-fns-tz'
import { useEffect, useState } from 'react'
import { BoxArrowUpRight, Envelope } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Module } from '../../constants/types'
import { useExerciseDialog } from '../../lib/exerciseDialog.context'
import { useUser } from '../../lib/user.context'
import {
  ModulePill,
  ResourceLink,
  SpecLink,
  UploadWrapper,
} from '../../styles/exerciseDialog.style'
import Dialog from './Dialog'
import FileUpload from './exercise/FileUpload'

const EXERCISE_DURATIONS = ['0-1 hours', '1-10 hours', '11-20 hours', '20+ hours']

const ExerciseDialog = () => {
  const { userDetails } = useUser()
  const { exercise, setExercise, exerciseMaterials, submittedFiles } = useExerciseDialog()

  const [module, setModule] = useState<Module | null>(null)

  useEffect(() => {
    setModule(userDetails?.modules.find(({ code }) => code === exercise?.moduleCode) || null)
  }, [exercise, userDetails])

  const { owner, spec, dataFiles, modelAnswers, handIns } = exerciseMaterials || {}
  const [timeSpent, setTimeSpent] = useState('')

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const displayTimestamp = (date: Date | string) =>
    formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa zzz, EEEE d LLL yyyy')

  return (
    exercise &&
    exerciseMaterials &&
    module && (
      <Dialog open={true} onOpenChange={() => setExercise(null)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 400, fontSize: '2rem', width: 'fit-content' }}>
            {exercise.type}: {exercise.title}
          </h3>
          {owner && (
            <address style={{ display: 'flex', alignItems: 'center' }}>
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
          {module.code}: {module.title}
        </ModulePill>

        <div
          style={{
            display: 'grid',
            width: '100%',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            gridGap: '2rem',
            marginTop: '1rem',
          }}
        >
          {spec && (
            <SpecLink target="_blank" href={spec.url}>
              <BoxArrowUpRight
                style={{ marginRight: '0.5rem', fill: 'inherit', float: 'left', fontWeight: 500 }}
                size={16}
              />
              View specification
            </SpecLink>
          )}
          {dataFiles && dataFiles.length > 0 && (
            <div
              style={{
                // marginRight: '3rem',
                border: '2px solid #c8c7c1',
                borderRadius: '0.5rem',
                padding: '1rem',
                width: 'fit-content',
              }}
            >
              <h4 style={{ fontWeight: '500', fontSize: '18px' }}>Data files</h4>
              <ul>
                {dataFiles.map((file, index) => (
                  <li key={index}>
                    <ResourceLink target="_blank" href={file.url}>
                      {file.name}.csv
                    </ResourceLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modelAnswers && modelAnswers.length > 0 && (
            <div
              style={{
                border: '2px solid #c8c7c1',
                borderRadius: '0.5rem',
                padding: '1rem',
                width: 'fit-content',
              }}
            >
              <h4 style={{ fontWeight: '500', fontSize: '18px' }}>Model answers</h4>
              <ul>
                {[modelAnswers[0]].map((file, index) => (
                  <li key={index}>
                    <ResourceLink target="_blank" href={file.url}>
                      {file.name}.pdf
                    </ResourceLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {handIns && handIns.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4>
              Submission ({submittedFiles?.length || 0}/{handIns.length})
            </h4>
            <p style={{ fontSize: '14px', color: '$sand8' }}>
              Deadline: {displayTimestamp(exercise.endDate)}
            </p>
            <UploadWrapper>
              {handIns.map((handIn: any, index: any) => (
                <FileUpload key={index} requiredFile={handIn} />
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
