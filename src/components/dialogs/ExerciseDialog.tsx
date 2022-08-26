import { formatInTimeZone } from 'date-fns-tz'
import { useState } from 'react'
import { BoxArrowUpRight } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise, Module, SetState } from '../../constants/types'
import { useExercise } from '../../lib/exerciseDialog.service'
import {
  EmailButton,
  LinkLogo,
  ModulePill,
  SpecLink,
  UploadWrapper,
} from '../../styles/exerciseDialog.style'
import Dialog from './Dialog'
import FileUpload from './exercise/FileUpload'

const EXERCISE_DURATIONS = ['0-1 hours', '1-10 hours', '11-20 hours', '20+ hours']

const ExerciseDialog = ({
  exercise,
  setExercise,
  module,
}: {
  exercise: Exercise
  setExercise: SetState<Exercise | null>
  module: Module
}) => {
  const { exerciseMaterials, submittedFiles, submitWorkload, submitFile, deleteFile } =
    useExercise(exercise)
  const { owner, spec, dataFiles, modelAnswers, fileRequirements } = exerciseMaterials || {}
  const [timeSpent, setTimeSpent] = useState('')

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const displayTimestamp = (date: Date | string) =>
    formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa zzz, EEEE d LLL yyyy')

  return (
    exercise &&
    exerciseMaterials && (
      <Dialog open={true} onOpenChange={() => setExercise(null)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 400, fontSize: '2rem', width: 'fit-content' }}>
            {exercise.type}: {exercise.title}
          </h3>
          {owner && (
            <address style={{ display: 'flex', alignItems: 'center' }}>
              <a
                title={'Email the exercise owner: ' + (owner.name || owner.shortcode)}
                href={`mailto:${owner.email}`}
              >
                <EmailButton size={24} />
              </a>
            </address>
          )}
        </div>
        <ModulePill>
          {exercise.moduleCode}: {module.title}
        </ModulePill>

        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            width: '100%',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            gridGap: '2rem',
            marginTop: '1rem',
          }}
        >
          {spec && (
            <SpecLink target="_blank" href={spec.url}>
              <LinkLogo size={18} />
              Specification
            </SpecLink>
          )}
          {dataFiles && dataFiles.length > 0 && (
            <SpecLink target="_blank" href={dataFiles[0].url}>
              <LinkLogo size={18} />
              Data Files
            </SpecLink>
          )}
          {modelAnswers && modelAnswers.length > 0 && (
            <SpecLink target="_blank" href={modelAnswers[0].url}>
              <LinkLogo size={18} />
              Model Answers
            </SpecLink>
          )}
        </div>

        {fileRequirements && fileRequirements.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <div>
              <h4>
                Submission ({submittedFiles?.length || 0}/{fileRequirements.length})
                {submittedFiles?.length === fileRequirements.length && ': you are all done! 🎉'}
              </h4>
              <p style={{ fontSize: '14px', color: '$sand8' }}>
                Deadline: {displayTimestamp(exercise.endDate)}
              </p>
              <UploadWrapper>
                {fileRequirements.map((fileRequirement, index: number) => (
                  <FileUpload
                    key={index}
                    fileRequirement={fileRequirement}
                    submittedFiles={submittedFiles}
                    submitFile={submitFile}
                    deleteFile={deleteFile}
                  />
                ))}
              </UploadWrapper>
              {submittedFiles?.length > 0 && (
                <div style={{ margin: '2rem' }}>
                  <div style={{ display: 'flex', fontSize: '0.9rem', marginTop: '1rem' }}>
                    <label htmlFor="exercise-duration">
                      How many hours did this coursework take you?
                    </label>
                    <select
                      value={timeSpent}
                      onChange={(event) => {
                        setTimeSpent(event.target.value)
                        submitWorkload(event.target.value)
                      }}
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
              <hr />
              <p style={{ fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center' }}>
                By uploading, you agree that this is your own, unaided work.
              </p>
            </div>
          </div>
        )}
      </Dialog>
    )
  )
}

export default ExerciseDialog
