import React from 'react'
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'

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
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
