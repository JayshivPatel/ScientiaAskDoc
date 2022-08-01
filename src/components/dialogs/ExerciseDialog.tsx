//okipullup
import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useState } from 'react'
import { CheckCircle, Envelope, Trash3Fill, Upload } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise } from '../../constants/types'
import { useExercises } from '../../lib/exercises.service'
import { ModulePill, UploadButton, UploadWrapper } from '../../styles/exerciseDialog.style'
import { Tabs } from '../Tabs'
import Dialog from './Dialog'

const ExerciseDialog = ({
  open,
  onOpenChange,
  exercise,
}: {
  open: boolean
  onOpenChange: (_: boolean) => void
  exercise: Exercise
}) => {
  interface FileDetail {
    name: string
    type: string[]
    file?: File
    timestamp?: Date
  }

  const [fileDetails, setFileDetails] = useState<FileDetail[]>([
    { name: 'Report', type: ['.pdf', '.txt'] },
    { name: 'Video-link', type: ['.mp4', '.pdf'] },
    { name: 'Slides', type: ['.pdf', '.txt'] },
  ])

  const items = [
    { title: 'Spec', link: 'https://google.com' },
    { title: 'Model Answer', link: 'https://example.com' },
  ]

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const formatTimestamp = (date: Date | string) => formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa, d LLL yyyy')

  return (
    <Dialog {...{ open, onOpenChange }}>
      <h3>{exercise.title}</h3>
      <ModulePill>
        {exercise.module_code}: {exercise.module_name}
      </ModulePill>
      <address>
        <a href="mailto:a.callia-diddio14@imperial.ac.uk">
          Set by: Andrea Callia D'Iddio
          <Envelope />
        </a>
      </address>
      <div style={{ marginTop: '1rem' }}>
        <h4>Resources</h4>
        <Tabs
          data={items}
          generator={(tab: any) => <span>{tab.title}</span>}
          onClick={(tab: any) => {
            window.open(tab.link)
          }}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Submission</h4>
        <p style={{ fontSize: '14px', color: '$sand8' }}>Deadline: {formatTimestamp(exercise.endDate)} (UK Time)</p>
        <hr />
        <UploadWrapper>
          {fileDetails.map((file, fileIndex) => (
            <div key={fileIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <UploadButton
                css={{
                  backgroundColor: file.file ? '$green5' : '',
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                htmlFor={`file-upload-${fileIndex}`}
              >
                {file.file && <CheckCircle />}
                <div>
                  <p>
                    {file.name} ({file.type.join(', ')}) <span>{} </span>
                  </p>

                  <p style={{ fontSize: '12px', color: '$sand8' }}>
                    {file.file && file.timestamp && formatTimestamp(file.timestamp)}
                  </p>
                  <p style={{ fontSize: '12px', color: '$sand8' }}>{file.file && prettyBytes(file.file.size)}</p>
                </div>

                {file.file ? <p>{file.file?.name}</p> : <Upload />}
              </UploadButton>

              {file.file && (
                <Trash3Fill
                  onClick={() => {
                    console.log({ fileDetails })
                    setFileDetails((fileDetails: FileDetail[]) =>
                      fileDetails.map((fileDetail, index) =>
                        index === fileIndex ? { ...fileDetail, file: undefined } : fileDetail
                      )
                    )
                  }}
                />
              )}
              <input
                onChange={(event) => {
                  if (event.target.files === null) return // clear
                  setFileDetails((fileDetails: FileDetail[]) =>
                    fileDetails.map((fileDetail, index) =>
                      index === fileIndex
                        ? { ...fileDetail, file: event.target.files![0], timestamp: new Date() }
                        : fileDetail
                    )
                  )
                  console.log(event.target.files[0])
                }}
                disabled={!!file.file} // not working
                type="file"
                accept={file.type.join(',')}
                id={`file-upload-${fileIndex}`}
                hidden
              />
            </div>
          ))}
        </UploadWrapper>
        <p style={{ fontSize: '0.8rem' }}>By uploading, you agree that this is your own, unaided work.</p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
