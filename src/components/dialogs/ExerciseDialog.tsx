import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useState } from 'react'
import { FileX, Upload } from 'react-bootstrap-icons'
import Dropzone, { useDropzone } from 'react-dropzone'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise } from '../../constants/types'
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
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  interface SubmittedFile {
    name: string
    file: FormData
    size: string
  }

  interface FileDetail {
    name: string
    type: string
    file?: SubmittedFile | null
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

  const submittedItems = [
    {
      title: 'report.pdf',
      timestamp: formatTimestamp('2022-07-27T19:56:59.669Z'),
      link: 'https://google.com',
    },
    { title: 'data.txt', timestamp: formatTimestamp('2022-07-26T09:56:59.669Z'), link: 'https://bbc.co.uk' },
  ]
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

        <div>
          {fileDetails.map((file, index) => (
            <>
              <label
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                htmlFor={`file-upload-${file.name}`}
              >
                <div>
                  <p>{file.name}</p>
                  <p>({file.type})</p>
                </div>
                <div>
                  <p></p>
                  <Upload />
                </div>
              </label>
              <input
                onChange={(e) => {
                  //setFileDetails
                  console.log(e.target.files[0])
                }}
                type="file"
                id={`file-upload-${file.name}`}
                hidden
              />
            </>
          ))}
        </div>

        <p style={{ fontSize: '0.8rem' }}>By submitting, you agree that this is your own, unaided work.</p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
