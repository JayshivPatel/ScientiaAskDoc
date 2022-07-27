import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useState } from 'react'
import { Trash3Fill, Upload } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise } from '../../constants/types'
import { UploadButton, UploadWrapper } from '../../styles/exerciseDialog.style'
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
    type: string
    file?: File
  }

  const [fileDetails, setFileDetails] = useState<FileDetail[]>([
    { name: 'Report', type: 'pdf' },
    { name: 'Video-link', type: 'txt' },
    { name: 'Slides', type: 'pdf' },
  ])

  const items = [
    { title: 'Spec', link: 'https://google.com' },
    { title: 'Model Answer', link: 'https://example.com' },
  ]

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const formatTimestamp = (date: string) => formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa, dd LLL yyyy')

  return (
    <Dialog
      title={exercise.title}
      primaryButtonText={'Submit'}
      secondaryButtonText={'Cancel'}
      onPrimaryClick={() => {}}
      {...{ open, onOpenChange }}
    >
      <div>
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
        {/* upload answers */}

        <hr />

        <UploadWrapper>
          {fileDetails.map((file, fileIndex) => (
            <>
              <UploadButton
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                htmlFor={`file-upload-${file.name}`}
              >
                <div>
                  <p>
                    {file.name} ({file.type})
                  </p>
                  <p>{file.file ? prettyBytes(file.file.size) : ' '}</p>
                </div>

                {file.file ? (
                  <>
                    <p>{file.file?.name}</p>
                    <Trash3Fill />
                  </>
                ) : (
                  <Upload />
                )}
                <input
                  onChange={(event) => {
                    if (event.target.files === null) return // clear
                    setFileDetails((fileDetails: FileDetail[]) =>
                      fileDetails.map((fileDetail, index) =>
                        index === fileIndex ? { ...fileDetail, file: event.target.files![0] } : fileDetail
                      )
                    )
                    console.log(event.target.files[0])
                  }}
                  type="file"
                  id={`file-upload-${file.name}`}
                  hidden
                />
              </UploadButton>
            </>
          ))}
        </UploadWrapper>

        <p style={{ fontSize: '0.8rem' }}>By submitting, you agree that this is your own, unaided work.</p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
