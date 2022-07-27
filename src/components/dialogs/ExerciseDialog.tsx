import { useContext } from 'react'

import { endpoints } from '../../constants/endpoints'
import { AxiosContext } from '../../lib/axios.context'
import { useToast } from '../../lib/toast.context'
import { css } from '../../styles/stitches.config'
import Dialog from './Dialog'

const ExerciseDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (_: boolean) => void }) => {
  const { addToast } = useToast()
  const axiosInstance = useContext(AxiosContext)

  return (
    <Dialog
      title={'Submit your work'}
      primaryButtonText={'OK'}
      secondaryButtonText={'Cancel'}
      onPrimaryClick={() => {}}
      {...{ open, onOpenChange }}
    ></Dialog>
  )
}

export default ExerciseDialog
