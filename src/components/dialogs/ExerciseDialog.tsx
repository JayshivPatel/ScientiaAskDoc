import React from 'react'

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
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
