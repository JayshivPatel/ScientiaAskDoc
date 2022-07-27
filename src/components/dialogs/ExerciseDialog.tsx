import Dialog from './Dialog'

const ExerciseDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (_: boolean) => void }) => {
  return (
    <Dialog
      title={'Submit your work'}
      primaryButtonText={'Submit'}
      secondaryButtonText={'Cancel'}
      onPrimaryClick={() => {}}
      {...{ open, onOpenChange }}
    ></Dialog>
  )
}

export default ExerciseDialog
