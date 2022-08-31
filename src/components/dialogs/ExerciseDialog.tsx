import { formatInTimeZone } from 'date-fns-tz'
import { useState } from 'react'
import { BoxArrowUpRight } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise, Module, SetState } from '../../constants/types'
import { useExercise } from '../../lib/exerciseDialog.service'
import { Button } from '../../styles/_app.style'
import {
  Deadline,
  EmailAddress,
  EmailButton,
  ExerciseTitle,
  LinkIcon,
  ModulePill,
  PlagiarismDisclaimer,
  ResourcesWrapper,
  SpecLink,
  SubmissionWrapper,
  TitleWrapper,
  UploadWrapper,
  WorkloadSelect,
  WorkloadSurveyWrapper,
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
        <TitleWrapper>
          <ExerciseTitle>
            {exercise.type}: {exercise.title}
          </ExerciseTitle>
          {owner && (
            <EmailAddress>
              <a
                title={'Email the exercise owner: ' + (owner.name || owner.shortcode)}
                href={`mailto:${owner.email}`}
              >
                <EmailButton size={24} />
              </a>
            </EmailAddress>
          )}
        </TitleWrapper>
        <ModulePill>
          {exercise.moduleCode}: {module.title}
        </ModulePill>

        <ResourcesWrapper>
          {spec && (
            <SpecLink target="_blank" href={spec.url}>
              <LinkIcon size={18} />
              Specification
            </SpecLink>
          )}
          {dataFiles && dataFiles.length > 0 && (
            <SpecLink target="_blank" href={dataFiles[0].url}>
              <LinkIcon size={18} />
              Data Files
            </SpecLink>
          )}
          {modelAnswers && modelAnswers.length > 0 && (
            <SpecLink target="_blank" href={modelAnswers[0].url}>
              <LinkIcon size={18} />
              Model Answers
            </SpecLink>
          )}
        </ResourcesWrapper>

        {fileRequirements && fileRequirements.length > 0 && (
          <SubmissionWrapper>
            <h4>
              Submission ({submittedFiles?.length || 0}/{fileRequirements.length})
              {submittedFiles?.length === fileRequirements.length && ': you are all done! 🎉'}
            </h4>
            <Deadline>Deadline: {displayTimestamp(exercise.endDate)}</Deadline>
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
              <WorkloadSurveyWrapper>
                <label htmlFor="exercise-duration">
                  How many hours did this coursework take you?
                </label>
                <WorkloadSelect
                  value={timeSpent}
                  onChange={(event) => {
                    setTimeSpent(event.target.value)
                    submitWorkload(event.target.value)
                  }}
                  name="exercise-duration"
                >
                  <option value="">Select...</option>
                  {EXERCISE_DURATIONS.map((duration, index) => (
                    <option key={index} value={duration}>
                      {duration}
                    </option>
                  ))}
                </WorkloadSelect>
              </WorkloadSurveyWrapper>
            )}

            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" style={{ width: 'auto', padding: '0.5rem' }}>
                Submit
              </Button>
            </div>

            <hr />
            <PlagiarismDisclaimer>
              By uploading, you agree that this is your own, unaided work.
            </PlagiarismDisclaimer>
          </SubmissionWrapper>
        )}
      </Dialog>
    )
  )
}

export default ExerciseDialog
