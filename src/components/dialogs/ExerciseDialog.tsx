import { Exercise } from '../../constants/types'
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
  return (
    <Dialog
      title={'Submit your work: ' + exercise.title}
      primaryButtonText={'Submit'}
      secondaryButtonText={'Cancel'}
      onPrimaryClick={() => {}}
      {...{ open, onOpenChange }}
    ></Dialog>
  )
}

export default ExerciseDialog
