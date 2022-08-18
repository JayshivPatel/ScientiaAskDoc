import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CheckLg, FileEarmark, Upload } from 'react-bootstrap-icons'

import { endpoints } from '../../../constants/endpoints'
import { LONDON_TIMEZONE } from '../../../constants/global'
import { Exercise, RequiredSubmission, SubmittedFile } from '../../../constants/types'
import { useExercise } from '../../../lib/exerciseDialog.service'
import { OpenLinkButton, TrashButton, UploadButton } from '../../../styles/exerciseDialog.style'

// Date format: https://date-fns.org/v2.29.1/docs/format
const displayTimestamp = (date: Date | string) =>
  formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa zzz, EEEE d LLL yyyy')

const FileUpload = ({
  exercise,
  requiredFile,
  submittedFiles,
  setSubmittedFiles,
}: {
  exercise: Exercise
  requiredFile: RequiredSubmission
  submittedFiles: SubmittedFile[]
  setSubmittedFiles: Dispatch<SetStateAction<SubmittedFile[]>>
}) => {
  const { submitFile, deleteFile } = useExercise()
  const [submittedFile, setSubmittedFile] = useState<SubmittedFile | null>(null)

  useEffect(() => {
    setSubmittedFile(
      submittedFiles?.find(
        ({ targetSubmissionFileName }) => targetSubmissionFileName === requiredFile.name
      ) || null
    )
  }, [requiredFile.name, submittedFiles])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        verticalAlign: 'middle',
      }}
    >
      <UploadButton
        css={{ backgroundColor: '$sand1' }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '1rem',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.06)) drop-shadow(0 1px 3px rgba(0,0,0,.1))',
        }}
        htmlFor={`exercise-upload-${requiredFile.name}`}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {submittedFile ? (
            <CheckLg
              size={24}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            />
          ) : (
            <FileEarmark
              size={24}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            />
          )}
          <div
            style={{
              marginLeft: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p>{requiredFile.name}</p>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#8F908C', // = $sand9
              }}
            >
              .{requiredFile.suffix}
            </p>
          </div>
        </div>
        {submittedFile ? (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <p>{displayTimestamp(submittedFile.timestamp)}</p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#8F908C', // = $sand9
                }}
              >
                {prettyBytes(submittedFile.fileSize)}
              </p>
            </div>
            <div>
              <OpenLinkButton
                size={24}
                onClick={(event) => {
                  event.preventDefault()
                  window.open(
                    endpoints.submissionFile(
                      submittedFile.year,
                      submittedFile.moduleCode,
                      submittedFile.exerciseNumber,
                      submittedFile.id
                    ),
                    '_blank'
                  )
                }}
              />

              <TrashButton
                size={24}
                onClick={(event) => {
                  event.preventDefault()
                  deleteFile({ file: submittedFile, setSubmittedFiles })
                }}
              />
            </div>
          </>
        ) : (
          <Upload size={24} />
        )}
      </UploadButton>

      <input
        type="file"
        onChange={(event) => {
          // TODO: on cancel of file browser: dont remove submission
          if (event.target.files === null) return
          // if (exercise.endDate > new Date()) return
          submitFile({
            file: event.target.files[0],
            targetName: requiredFile.name,
            exercise,
            setSubmittedFiles,
          })
        }}
        // disabled={exercise.endDate > new Date()}
        accept={'.' + requiredFile.suffix}
        id={`exercise-upload-${requiredFile.name}`}
        hidden
      />
    </div>
  )
}
export default FileUpload
