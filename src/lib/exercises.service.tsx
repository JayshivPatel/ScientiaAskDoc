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

  const uploadResource = async ({ file, ...resource }: any) => {
    // await axiosInstance
    //   .request({
    //     method: 'POST',
    //     url: endpoints.resources,
    //     data: {
    //       ...resource,
    //       year: year.toString(),
    //       course: moduleCode,
    //     },
    //   })
    //   .then(({ data }: any) => {
    //     if (resource.type === 'file') {
    //       let formData = new FormData()
    //       formData.append('file', file!)
    //       axiosInstance
    //         .request({
    //           method: 'PUT',
    //           url: endpoints.resources + '/' + data.id + '/file',
    //           data: formData,
    //         })
    //         .catch((error: any) => {
    //           // TODO: TOAST to report that file upload failed
    //           console.error(error)
    //         })
    //     }
    //   })
    //   .then(() => {
    //     axiosInstance
    //       .request({
    //         method: 'GET',
    //         url: endpoints.resources,
    //         params: { year, course: moduleCode },
    //       })
    //       .then(({ data }: any) => setGroupedMaterials(groupByProperty(data, 'category', 'index')))
    //       .catch((error: any) => {
    //         // TODO: TOAST to report that getting new materials failed
    //         console.error(error)
    //       })
    //   })
    //   .catch((error: any) => {
    //     // TODO: TOAST to report that resource creation failed
    //     console.error(error)
    //   })
  }

  // const { year } = useYear()

  const getExerciseMaterials = async ({ academicYear, yearGroup, setExerciseMaterials, exerciseId }: any) => {
    // TODO: uncomment when ready to test with ABC API
    // await axiosInstance
    //   .request({
    //     method: 'GET',
    //     url: `/${academicYear}/${yearGroup}/exercises/${exerciseId}/files`,
    //   })
    //   .then(setExerciseMaterials)
    //   .catch((error: any) => {
    //     // TODO: TOAST
    //     console.error(error)
    //   })

    setExerciseMaterials({
      owner: {
        shortcode: 'kgk',
      },
      spec: {
        name: 'specification',
        suffix: 'pdf',
        url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:1:q5:SPECS',
      },
      handin: [
        {
          name: 'final_report',
          suffix: ['pdf'],
          max_size: 100000,
        },
        {
          name: 'slides',
          suffix: ['pdf', 'ppt', 'pptx'],
          max_size: 100000,
          url: 'https://cate.doc.ic.ac.uk/submission_file_1',
          size: 2345,
        },
        {
          name: 'ethics_checklist',
          suffix: ['pdf', 'xls', 'xlsx'],
          max_size: 100000,
        },
      ],
      model_answers: [
        {
          name: 'solution',
          suffix: 'pdf',
          url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:2:q5:MODELS',
        },
      ],
      data_files: [], // ?
    })
  }

  return { getExerciseMaterials }
}
