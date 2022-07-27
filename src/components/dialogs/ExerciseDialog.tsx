import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'

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

  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFile[]>([])

  const onDrop = (files: any): void => {
    setSubmittedFiles((previousFiles: SubmittedFile[]) => {
      return [
        ...previousFiles,
        ...files.map((file: any) => {
          let formData = new FormData()
          formData.append('file', file)

          return {
            name: file.name,
            file: formData,
            size: prettyBytes(file.size),
          }
        }),
      ]
    })
  }

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

      <div>
        <h4>Submission</h4>
        {/* upload answers */}

        <Tabs
          data={submittedItems}
          generator={(tab: any) => (
            <span>
              {tab.title} - {tab.timestamp}
            </span>
          )}
          onClick={(tab: any) => {
            window.open(tab.link)
          }}
        />

        <hr />

        <Tabs
          data={submittedFiles}
          generator={(file: any) => (
            <span>
              {file.name} - {file.size}
            </span>
          )}
        />

        <div style={{ cursor: 'pointer', borderStyle: 'dashed', borderWidth: '2px' }}>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} style={{ textAlign: 'center', padding: '1rem' }}>
                  <input {...getInputProps()} />
                  <p>Drag files here</p>
                  <p>or</p>
                  <p>Select files from your device</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <p style={{ fontSize: '0.8rem' }}>By submitting, you agree that this is your own, unaided work.</p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
