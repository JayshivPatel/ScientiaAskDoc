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
      title={exercise.title}
      primaryButtonText={'Submit'}
      secondaryButtonText={'Cancel'}
      onPrimaryClick={() => {}}
      {...{ open, onOpenChange }}
    >
      <div>
        <h4>Resources</h4>
        {/* show specs / resources */}
      </div>

      {/* how many hours (?) */}

      <div>
        <h4>Submission</h4>
        {/* upload answers */}
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
