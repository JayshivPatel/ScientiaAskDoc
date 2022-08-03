import { zonedTimeToUtc } from 'date-fns-tz'
import { useContext } from 'react'

import { LONDON_TIMEZONE } from '../constants/global'
import { AxiosContext } from './axios.context'
import { useYear } from './year.context'

export const getUTCDatetime = (date: string, time: string) => zonedTimeToUtc(date + ' ' + time, LONDON_TIMEZONE)

export const useExercises = (): any => {
  const axiosInstance = useContext(AxiosContext)
  // const { year } = useYear()
  // const moduleCode = useOutletContext<string | null>()

  // const { year } = useYear()
  const getExerciseMaterials = async ({ academicYear, yearGroup, setExerciseMaterials, exerciseId }: any) => {
    // TODO: uncomment when ready to test with ABC API
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

    // setExerciseMaterials({
    //   owner: { shortcode: 'pipl12', email: 'pipl12@imperial.ac.uk', name: null },
    //   spec: {
    //     name: 'specification',
    //     suffix: ['pdf'],
    //     url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:1:v5:SPECS',
    //   },
    //   hand_ins: [
    //     { name: 'final_report', suffix: ['pdf'], url: null, max_size: 1 },
    //     { name: 'slides', suffix: ['pdf', 'ppt', 'pptx'], url: null, max_size: 1 },
    //     { name: 'ethics_checklist', suffix: ['pdf', 'xls', 'xlsx'], url: null, max_size: 1 },
    //   ],
    //   model_answers: [
    //     { name: 'solution', suffix: ['pdf'], url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:2:v5:MODELS' },
    //     {
    //       name: 'ethics_checklist',
    //       suffix: ['pdf'],
    //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:6:v5:MODELS',
    //     },
    //   ],
    //   data_files: [
    //     {
    //       name: 'ethics_checklist',
    //       suffix: ['csv'],
    //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:7:v5:DATA',
    //     },
    //     {
    //       name: 'ethics_checklist',
    //       suffix: ['txt'],
    //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:8:v5:DATA',
    //     },
    //   ],
    // })
  }

  return { getExerciseMaterials }
}
