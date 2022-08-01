import { zonedTimeToUtc } from 'date-fns-tz'
import { useContext } from 'react'

import { LONDON_TIMEZONE } from '../constants/global'
import { AxiosContext } from './axios.context'
import { useYear } from './year.context'

export const getUTCDatetime = (date: string, time: string) => zonedTimeToUtc(date + ' ' + time, LONDON_TIMEZONE)

export const useExercises = (): any => {
  const axiosInstance = useContext(AxiosContext)
  // const { year } = useYear()

  const getExerciseMaterials = async ({ academic_year, id, letter_year, term }: any) => {
    await axiosInstance
      .request({
        method: 'GET',
        url: `/${academic_year}/exercises/${id}/${letter_year}/${term}/files`,
      })
      .catch((error: any) => {
        // TODO: TOAST
        console.error(error)
      })
  }

  return { getExerciseMaterials }
}
