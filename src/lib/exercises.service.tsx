import { zonedTimeToUtc } from 'date-fns-tz'
import { useContext } from 'react'

import { FileToSubmit } from '../components/dialogs/ExerciseDialog'
import { LONDON_TIMEZONE } from '../constants/global'
import { AxiosContext } from './axios.context'

export const getUTCDatetime = (date: string, time: string) => zonedTimeToUtc(date + ' ' + time, LONDON_TIMEZONE)

export const useExercises = (): any => {
  const axiosInstance = useContext(AxiosContext)

  const getExerciseMaterials = async ({ academicYear, yearGroup, setExerciseMaterials, exerciseId }: any) => {
    await axiosInstance
      .request({
        method: 'GET',
        url: `/${academicYear}/${yearGroup}/exercises/${exerciseId}/files`,
      })
      .then(({ data }: any) => setExerciseMaterials(data))
      .catch((error: any) => {
        // TODO: TOAST
        console.error(error)
      })
  }

  const submitFile = (file: FileToSubmit) => {
    console.log('Uploading: ', { file })
  }

  const deleteFile = (file: FileToSubmit) => {
    console.log('Deleting: ', { file })
  }

  return { getExerciseMaterials, submitFile, deleteFile }
}
