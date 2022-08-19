import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { CheckLg, Trash3Fill, Upload } from 'react-bootstrap-icons'

import { endpoints } from '../../../constants/endpoints'
import { LONDON_TIMEZONE } from '../../../constants/global'
import { FileRequirement, SubmittedFile } from '../../../constants/types'
import { Button } from '../../../styles/_app.style'
import { OpenLinkButton, TrashButton, UploadButton } from '../../../styles/exerciseDialog.style'

// Date format: https://date-fns.org/v2.29.1/docs/format
const displayTimestamp = (date: Date | string) =>
  formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm:ss aaa zzz, EEEE d LLL yyyy')

const FileUpload = ({
  fileRequirement,
  submittedFiles,
  submitFile,
  deleteFile,
}: {
  fileRequirement: FileRequirement
  submittedFiles: SubmittedFile[]
  submitFile: (_: { file: File; targetFileName: string }) => void
  deleteFile: (_: SubmittedFile) => void
}) => {
  const [submittedFile, setSubmittedFile] = useState<SubmittedFile | null>(null)

  useEffect(() => {
    setSubmittedFile(
      submittedFiles?.find(({ targetFileName }) => targetFileName === fileRequirement.name) || null
    )
  }, [fileRequirement, submittedFiles])

  function openSubmissionFile(event: any) {
    if (!submittedFile) return
    event.preventDefault()
    window.open(
      endpoints.submissionFile(
        submittedFile.year,
        submittedFile.moduleCode,
        submittedFile.exerciseNumber,
        submittedFile.targetFileName,
        submittedFile.id
      ),
      '_blank'
    )
  }

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
        htmlFor={`exercise-upload-${fileRequirement.name}`}
        onClick={openSubmissionFile}
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
            <Upload
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
            <p>{fileRequirement.name}</p>
          </div>
        </div>
        {submittedFile && (
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
        )}
      </UploadButton>

      {submittedFile && (
        <Button
          style={{ marginLeft: '1rem', width: '3.5rem', height: '3rem' }}
          onClick={(event) => {
            event.preventDefault()
            deleteFile(submittedFile)
          }}
        >
          <TrashButton size={24} />
        </Button>
      )}
      <input
        type="file"
        disabled={!!submittedFile} // || exercise.endDate > new Date()
        onChange={(event) => {
          if (!event.target.files) return
          // if (exercise.endDate > new Date()) return
          submitFile({
            file: event.target.files[0],
            targetFileName: fileRequirement.name,
          })
          // Fixes Chrome and Firefox upload issue https://stackoverflow.com/a/25948969/10564311
          ;(event.target as HTMLInputElement).value = ''
          return false
        }}
        accept={fileRequirement.name.slice(fileRequirement.name.indexOf('.'))}
        id={`exercise-upload-${fileRequirement.name}`}
        hidden
      />
    </div>
  )
}
export default FileUpload
