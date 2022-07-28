import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { Fragment, useState } from 'react'
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
    type: string[]
    file?: File
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
  const formatTimestamp = (date: Date | string) => formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa, dd LLL yyyy')

  return (
    <Dialog
      title={exercise.title}
      primaryButtonText={'Upload'}
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
        Deadline: {formatTimestamp(exercise.endDate)} (UK Time)
        <hr />
        <UploadWrapper>
          {fileDetails.map((file, fileIndex) => (
            <div key={fileIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <UploadButton
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                htmlFor={`file-upload-${fileIndex}`}
              >
                <div>
                  <p>
                    {file.name} ({file.type.join(', ')})
                  </p>
                  <p>{file.file ? prettyBytes(file.file.size) : ' '}</p>
                </div>

                {file.file ? (
                  <>
                    <p>{file.file?.name}</p>
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
                  disabled={!!file.file} // not working
                  type="file"
                  accept={file.type.join(',')}
                  id={`file-upload-${fileIndex}`}
                  hidden
                />
              </UploadButton>
            </div>
          ))}
        </UploadWrapper>
        <p style={{ fontSize: '0.8rem' }}>By submitting, you agree that this is your own, unaided work.</p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
