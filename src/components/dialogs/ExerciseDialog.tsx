import { utcToZonedTime } from 'date-fns-tz'
import React from 'react'
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
  const items = [
    { title: 'Spec', link: 'https://google.com' },
    { title: 'Model Answer', link: 'https://example.com' },
  ]

  const submittedItems = [
    { title: 'report.pdf', timestamp: 'Friday 1st July 2022 at 3.30am', link: 'https://google.com' },
    { title: 'data.txt', timestamp: 'Friday 1st July 2022 at 6.59am', link: 'https://bbc.co.uk' },
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

        <div style={{ cursor: 'pointer', borderStyle: 'dashed', borderWidth: '2px' }}>
          <Dropzone onDrop={() => {}}>
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
