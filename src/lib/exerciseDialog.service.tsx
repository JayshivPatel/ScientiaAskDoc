import { plainToInstance } from 'class-transformer'
import { useContext } from 'react'

import { endpoints } from '../constants/endpoints'
import { Exercise, ExerciseMaterials, SetState, SubmittedFile } from '../constants/types'
import { AxiosContext } from './axios.context'
import { useToast } from './toast.context'
import { useYear } from './year.context'

/**
 * Get exercise materials (returns owner, spec, dataFiles, modelAnswers, fileRequirements)
 * Submit file
 * Delete file submitted
 * Get all files submitted for 1 exercise (returns URL, timestamp & file size for each file)
 * Get individual file submitted (User views this on browser) */

export const useExercise = (exercise: Exercise) => {
  const axiosInstance = useContext(AxiosContext)
  const { year } = useYear()
  // TODO: get year group from user details
  const yearGroup = 'c1'

  const { addToast } = useToast()

  const getExerciseMaterials = (setExerciseMaterials: SetState<ExerciseMaterials | null>) => {
    axiosInstance
      .request({
        method: 'GET',
        url: `/${year}/${yearGroup}/exercises/${exercise.number}/files`,
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

  const getSubmittedFiles = (setSubmittedFiles: SetState<SubmittedFile[]>) => {
    axiosInstance
      .request({
        method: 'GET',
        url: endpoints.submissions(`${year}`, exercise.moduleCode!, exercise.number),
      })
      .then(({ data }: { data: SubmittedFile[] }) =>
        setSubmittedFiles(
          data.map((submittedFile) => plainToInstance(SubmittedFile, submittedFile))
        )
      )
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: 'Unable to fetch submitted files for this exercise',
        })
        console.error(error)
      })
  }

  const submitFile = ({
    file,
    targetFileName,
    setSubmittedFiles,
  }: {
    file: File
    targetFileName: string
    setSubmittedFiles: SetState<SubmittedFile[]>
  }) => {
    let formData = new FormData()
    formData.append('file', new File([file], targetFileName))
    axiosInstance
      .request({
        method: 'POST',
        url: endpoints.submissions(year.toString(), exercise.moduleCode!, exercise.number),
        data: formData,
      })
      .then(({ data }: { data: SubmittedFile }) =>
        setSubmittedFiles((submittedFiles) => [
          ...submittedFiles,
          plainToInstance(SubmittedFile, data),
        ])
      )
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: "Can't fetch submitted files",
        })
        console.error(error)
      })
  }

  const deleteFile = ({
    file,
    setSubmittedFiles,
  }: {
    file: SubmittedFile
    setSubmittedFiles: SetState<SubmittedFile[]>
  }) => {
    axiosInstance
      .request({
        method: 'DELETE',
        url: endpoints.submission(year.toString(), file.moduleCode, file.exerciseNumber, file.id),
      })
      .then(() => {
        setSubmittedFiles((submittedFiles) =>
          submittedFiles.filter((submission) => submission.targetFileName !== file.targetFileName)
        )
      })
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: "Can't delete submitted file",
        })
        console.error(error)
      })
  }

  const submitWorkload = (workload: string) => {
    if (workload === '') return
    axiosInstance.request({
      method: 'POST',
      url: endpoints.submissionWorkload(`${year}`, exercise.moduleCode!, exercise.number),
      params: { workload },
    })
  }

  return {
    getExerciseMaterials,
    getSubmittedFiles,
    submitFile,
    deleteFile,
    submitWorkload,
  }
}
