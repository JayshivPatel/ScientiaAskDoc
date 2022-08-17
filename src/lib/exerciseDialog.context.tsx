import { plainToInstance } from 'class-transformer'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import ExerciseDialog from '../components/dialogs/ExerciseDialog'
import { endpoints } from '../constants/endpoints'
import { Exercise, ExerciseMaterials, RequiredSubmission, SubmittedFile } from '../constants/types'
import { AxiosContext } from './axios.context'
import { useToast } from './toast.context'
import { useYear } from './year.context'

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
  submitFile: (_: any, targetSubmissionFileName: string) => void
  deleteFile: (_: any) => void
}

export const ExerciseDialogContext = createContext<ExerciseDialogManager>({
  exercise: null,
  setExercise: (_: Exercise | null) => {},
  exerciseMaterials: null,
  submittedFiles: null,
  submitFile: (_: any, targetSubmissionFileName: string) => {},
  deleteFile: (_: any) => {},
})

export const ExerciseDialogProvider = ({ children }: { children: ReactNode }) => {
  const axiosInstance = useContext(AxiosContext)
  const { year } = useYear()

  const { addToast } = useToast()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [exerciseMaterials, setExerciseMaterials] = useState<ExerciseMaterials | null>(null)
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFile[]>([])

  useEffect(() => {
    if (!exercise) return
    // TODO: get user's year group
    getExerciseMaterials({
      academicYear: year,
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
    axiosInstance
      .request({
        method: 'GET',
        url: endpoints.exerciseSubmissions(`${year}`, exercise!.moduleCode!, exercise!.number),
      })
      .then(({ data }: any) =>
        setSubmittedFiles(
          data.map((submittedFile: SubmittedFile) => plainToInstance(SubmittedFile, submittedFile))
        )
      )
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: 'Unable to fetch submitted files for this exercise',
        })
        console.error(error)
      })
    // setSubmittedFiles([
    //   {
    //     targetSubmissionFileName: 'final_report',
    //     size: 1032449,
    //     timestamp: '2022-01-01T18:19:32.993Z',
    //   },
    // ])
  }

  const submitFile = ({ file }: { file: File }, targetSubmissionFileName: string) => {
    console.log('Uploading: ', { file })
    const renamedFile = new File([file], targetSubmissionFileName)
    let formData = new FormData()
    formData.append('file', renamedFile)
    axiosInstance
      .request({
        method: 'POST',
        url: endpoints.exerciseSubmissions(`${year}`, exercise!.moduleCode!, exercise!.number),
        data: formData,
      })
      .then(({ data }: { data: SubmittedFile }) => {
        setSubmittedFiles((submittedFiles: SubmittedFile[]) =>
          submittedFiles.map((submission) =>
            submission.targetSubmissionFileName === data.targetSubmissionFileName
              ? plainToInstance(SubmittedFile, data)
              : submission
          )
        )
      })
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: 'Unable to fetch submitted files for this exercise',
        })
        console.error(error)
      })
    // TODO: show new file
  }

  const deleteFile = (file: RequiredSubmission) => {
    console.log('Deleting: ', { file })
    // TODO: call delete endpoint
    // TODO: remove file from frontend
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
