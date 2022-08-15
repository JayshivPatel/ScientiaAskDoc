import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { BoxArrowUpRight, CheckLg, FileEarmark, Upload } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../../constants/global'
import { RequiredSubmission, SubmittedFile } from '../../../constants/types'
import { useExerciseDialog } from '../../../lib/exerciseDialog.context'
import { TrashButton, UploadButton } from '../../../styles/exerciseDialog.style'

// Date format: https://date-fns.org/v2.29.1/docs/format
const displayTimestamp = (date: Date | string) =>
  formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa zzz, EEEE d LLL yyyy')

const FileUpload = ({ requiredFile, key }: { requiredFile: RequiredSubmission; key: number }) => {
  const { submittedFiles, submitFile, deleteFile } = useExerciseDialog()
  const [submittedFile, setSubmittedFile] = useState<SubmittedFile | null>(null)
  useEffect(() => {
    console.log({ submittedFiles })
    setSubmittedFile(
      submittedFiles?.find(
        ({ targetSubmissionFileName }) => targetSubmissionFileName === requiredFile.name
      ) || null
    )
  }, [submittedFiles])

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
        htmlFor={`exercise-upload-${key}`}
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
                {prettyBytes(submittedFile.size)}
              </p>
            </div>
            <BoxArrowUpRight size={24} style={{ fontSize: '1rem' }} />
            <TrashButton
              size={24}
              style={{ fontSize: '1rem' }}
              onClick={(event) => {
                deleteFile(submittedFile)
                event.preventDefault()
              }}
            />
          </>
        ) : (
          <Upload size={24} />
        )}
      </UploadButton>

      <input
        type="file"
        onChange={(event) => {
          console.log({ event })
          // TODO: on cancel of file browser: dont remove submission
          if (event.target.files === null) return
          // if (exercise.endDate > new Date()) return
          submitFile(event.target.files[0])
        }}
        // disabled={exercise.endDate > new Date()}
        accept={'.' + requiredFile.suffix}
        id={`exercise-upload-${key}`}
        hidden
      />
    </div>
  )
}
export default FileUpload
