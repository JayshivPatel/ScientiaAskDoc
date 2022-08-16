import { plainToInstance } from 'class-transformer'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import ExerciseDialog from '../components/dialogs/ExerciseDialog'
import { Exercise, ExerciseMaterials, RequiredSubmission, SubmittedFile } from '../constants/types'
import { AxiosContext } from './axios.context'
import { useToast } from './toast.context'
import { currentShortYear } from './utilities.service'

/**
 * Get exercise materials (returns owner, spec, dataFiles, modelAnswers, fileRequirements)
 * Submit file
 * Delete file submitted
 * Get all files submitted for 1 exercise (returns URL, timestamp & file size for each file)
 * Get individual file submitted (User views this on browser) */

interface ExerciseDialogManager {
  exercise: Exercise | null
  setExercise: (_: Exercise | null) => void
  exerciseMaterials: ExerciseMaterials | null
  submittedFiles: SubmittedFile[] | null
  submitFile: (_: any) => void
  deleteFile: (_: any) => void
}

export const ExerciseDialogContext = createContext<ExerciseDialogManager>({
  exercise: null,
  setExercise: (_: Exercise | null) => {},
  exerciseMaterials: null,
  submittedFiles: null,
  submitFile: (_: any) => {},
  deleteFile: (_: any) => {},
})

export const ExerciseDialogProvider = ({ children }: { children: ReactNode }) => {
  const axiosInstance = useContext(AxiosContext)
  const { addToast } = useToast()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [exerciseMaterials, setExerciseMaterials] = useState<ExerciseMaterials | null>(null)
  const [submittedFiles, setSubmittedFiles] = useState<any | null>(null)

  useEffect(() => {
    if (!exercise) return
    // TODO: get user's year group
    getExerciseMaterials({
      academicYear: currentShortYear(),
      yearGroup: 'c1',
      exerciseId: exercise.number,
      setExerciseMaterials,
    })
    getSubmittedFiles()
  }, [exercise])

  const getExerciseMaterials = ({ academicYear, yearGroup, exerciseId }: any) => {
    axiosInstance
      .request({
        method: 'GET',
        url: `/${academicYear}/${yearGroup}/exercises/${exerciseId}/files`,
      })
      .then(({ data }: any) => setExerciseMaterials(plainToInstance(ExerciseMaterials, data)))
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: 'There was an error fetching the materials for this exercise',
        })
        console.error(error)
      })
  }

  const getSubmittedFiles = () => {
    console.log('Getting submitted files...')
    // TODO
    setSubmittedFiles([
      {
        targetSubmissionFileName: 'final_report',
        size: 1032449,
        timestamp: '2022-01-01T18:19:32.993Z',
      },
    ])
  }

  const submitFile = ({ file }: { file: File }) => {
    console.log('Uploading: ', { file })
    // TODO: call delete endpoint
    // TODO: get new files
  }

  const deleteFile = (file: RequiredSubmission) => {
    console.log('Deleting: ', { file })
    // TODO: call delete endpoint
    // TODO: get new files
  }

  return (
    <ExerciseDialogContext.Provider
      value={{ exercise, setExercise, exerciseMaterials, submittedFiles, submitFile, deleteFile }}
    >
      {children}
      {<ExerciseDialog />}
    </ExerciseDialogContext.Provider>
  )
}

export const useExerciseDialog = () => useContext(ExerciseDialogContext)
