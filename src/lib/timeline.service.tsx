import { useContext } from 'react'

import { Term } from '../constants/types'
import { AxiosContext } from './axios.context'

export const useTimeline = (): any => {
  const axiosInstance = useContext(AxiosContext)

  const getAcademicPeriods = async ({
    academicYear,
    setPeriods,
  }: {
    academicYear: string
    setPeriods: (_: Term[]) => void
  }) => {
    await axiosInstance
      .request({
        method: 'GET',
        url: `/${academicYear}/periods`,
      })
      .then(({ data }: any) => {
        setPeriods(
          data.map(({ start, end, ...rest }: any) => ({
            start: new Date(new Date(start).setDate(new Date(start).getDate() + 2)),
            end: new Date(end),
            ...rest,
          }))
        )
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return { getAcademicPeriods }
}
/*
[
  {
    "name": "summer term",
    "weeks": 9,
    "start": "2022-04-30",
    "end": "2022-07-01"
  },
  {
    "name": "autumn term",
    "weeks": 11,
    "start": "2021-10-02",
    "end": "2021-12-17"
  },
  {
    "name": "winter break",
    "weeks": 3,
    "start": "2021-12-18",
    "end": "2022-01-07"
  },
  {
    "name": "spring term",
    "weeks": 11,
    "start": "2022-01-08",
    "end": "2022-03-25"
  },
  {
    "name": "spring break",
    "weeks": 5,
    "start": "2022-03-26",
    "end": "2022-04-29"
  },
  {
    "name": "summer break",
    "weeks": 13,
    "start": "2022-07-02",
    "end": "2022-09-30"
  }
]
*/
