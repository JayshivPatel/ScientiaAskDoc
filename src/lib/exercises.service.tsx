import { useContext } from 'react'

import { AxiosContext } from './axios.context'
import { useToast } from './toast.context'

export const useExercises = (): any => {
  const axiosInstance = useContext(AxiosContext)
  const { addToast } = useToast()

  const getExerciseMaterials = async ({
    academicYear,
    yearGroup,
    exerciseId,
    setExerciseMaterials,
  }: any) => {
    await axiosInstance
      .request({
        method: 'GET',
        url: `/${academicYear}/${yearGroup}/exercises/${exerciseId}/files`,
      })
      .then(({ data }: any) => setExerciseMaterials(data))
      .catch((error: any) => {
        addToast({
          variant: 'error',
          title: 'There was an error fetching the materials for this exercise',
        })
        console.error(error)
      })
  }

  // {
  //   owner: {
  //     shortcode: 'pipl12',
  //     email: 'pipl12@imperial.ac.uk',
  //     name: None,
  //   },
  //   spec: {
  //     name: 'specification.pdf',
  //     url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:1:v5:SPECS',
  //   },
  //   hand_ins: [
  //     {
  //       name: 'final_report'
  //       suffix: '.pdf',
  //       max_size: 1,
  //     },
  //     {
  //       name: 'slides',
  //       suffix: 'pdf',
  //       max_size: 1,
  //     },
  //     {
  //       name: 'ethics_checklist',
  //       suffix: 'pdf',
  //       max_size: 1,
  //     },
  //   ],
  //   model_answers: [
  //     {
  //       name: 'solution.pdf',
  //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:2:v5:MODELS',
  //     },
  //     {
  //       name: 'ethics_checklist.pdf',
  //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:6:v5:MODELS',
  //     },
  //   ],
  //   data_files: [
  //     {
  //       name: 'ethics_checklist.csv',
  //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:7:v5:DATA',
  //     },
  //     {
  //       name: 'ethics_checklist.txt',
  //       url: 'https://cate.doc.ic.ac.uk/showfile.cgi?key=2021:1:8:v5:DATA',
  //     },
  //   ],
  // }

  const submitFile = ({
    year,
    moduleCode,
    exerciseNumber,
    file,
  }: {
    year: string
    moduleCode: string
    exerciseNumber: number
    file: File
  }) => {
    console.log('Uploading: ', { file })
  }

  const deleteFile = (file: FileToSubmit) => {
    console.log('Deleting: ', { file })
  }

  return { getExerciseMaterials, submitFile, deleteFile }
}
