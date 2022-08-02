//okipullup
import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { CheckCircle, Envelope, Trash3Fill, Upload } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise } from '../../constants/types'
import { useExercises } from '../../lib/exercises.service'
import { currentShortYear } from '../../lib/utilities.service'
import { ModulePill, UploadButton, UploadWrapper } from '../../styles/exerciseDialog.style'
import { Tabs } from '../Tabs'
import Dialog from './Dialog'

const ExerciseDialog = ({
  open,
  onOpenChange,
  exercise,
}: {
  open: boolean
  onOpenChange: (_: boolean) => void
  exercise: Exercise
}) => {
  const { getExerciseMaterials } = useExercises()

  interface Material {
    name: string
    suffix: string
    url: string
  }

  interface FileToSubmit {
    name: string
    suffix: string[]
    max_size: number
    url?: string
    size?: number
    file?: File
    timestamp?: Date
  }

  const [exerciseMaterials, setExerciseMaterials] = useState<any | null>(null)
  const [spec, setSpec] = useState<Material | null>(null)
  const [modelAnswers, setModelAnswers] = useState<Material[]>([])
  const [dataFiles, setDataFiles] = useState<Material[]>([])
  const [filesToSubmit, setFilesToSubmit] = useState<FileToSubmit[]>([])

  useEffect(() => {
    getExerciseMaterials({
      academic_year: currentShortYear(),
      year_group: 'c1',
      exerciseId: exercise.number,
      setExerciseMaterials,
    })
  }, [exercise])

  useEffect(() => {
    if (!exerciseMaterials) return
    console.log({ exerciseMaterials })
    setSpec(exerciseMaterials.spec)
    setModelAnswers(exerciseMaterials.model_answers)
    setDataFiles(exerciseMaterials.data_files)
    setFilesToSubmit(exerciseMaterials.handin)
  }, [exerciseMaterials])

  useEffect(() => console.log({ spec }), [spec])
  useEffect(() => console.log({ modelAnswers }), [modelAnswers])
  useEffect(() => console.log({ dataFiles }), [dataFiles])

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const formatTimestamp = (date: Date | string) => formatInTimeZone(date, LONDON_TIMEZONE, 'h:mm aaa, d LLL yyyy')

  return (
    <Dialog {...{ open, onOpenChange }}>
      <h3>{exercise.title}</h3>
      <ModulePill>
        {exercise.module_code}: {exercise.module_name}
      </ModulePill>
      <address>
        <a href="mailto:a.callia-diddio14@imperial.ac.uk">
          <Envelope />
        </a>
      </address>
      <div style={{ marginTop: '1rem' }}>
        <h4>Resources</h4>

        <UploadWrapper>
          {spec && <a href={spec.url}>{spec.name}</a>}
          {dataFiles.map((file, fileIndex) => (
            <a key={fileIndex} href={file.url} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {file.name}
            </a>
          ))}
          {modelAnswers.map((file, fileIndex) => (
            <a key={fileIndex} href={file.url} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {file.name}
            </a>
          ))}
        </UploadWrapper>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Submission</h4>
        <p style={{ fontSize: '14px', color: '$sand8' }}>Deadline: {formatTimestamp(exercise.endDate)} (UK Time)</p>
        <hr />
        <UploadWrapper>
          {filesToSubmit.map((file, fileIndex) => (
            <div key={fileIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <UploadButton
                css={{
                  backgroundColor: file.file ? '$green5' : '',
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                htmlFor={`file-upload-${fileIndex}`}
              >
                {file.file && <CheckCircle />}
                <div>
                  <p>
                    {file.name} <div style={{ fontSize: '0.8rem' }}>({file.suffix.join(', ')})</div>
                  </p>

                  <p style={{ fontSize: '12px', color: '$sand8' }}>
                    {file.file && file.timestamp && formatTimestamp(file.timestamp)}
                  </p>
                  <p style={{ fontSize: '12px', color: '$sand8' }}>{file.file && prettyBytes(file.file.size)}</p>
                </div>

                {file.file ? <p>{file.file?.name}</p> : <Upload />}
              </UploadButton>

              {file.file && (
                <Trash3Fill
                  onClick={() => {
                    console.log({ filesToSubmit })
                    setFilesToSubmit((filesToSubmit: any) =>
                      filesToSubmit.map((fileToSubmit: any, index: number) =>
                        index === fileIndex ? { ...fileToSubmit, file: undefined } : fileToSubmit
                      )
                    )
                  }}
                />
              )}
              <input
                onChange={(event) => {
                  if (event.target.files === null) return // clear
                  setFilesToSubmit((filesToSubmit: FileToSubmit[]) =>
                    filesToSubmit.map((fileToSubmit, index) =>
                      index === fileIndex
                        ? { ...fileToSubmit, file: event.target.files![0], timestamp: new Date() }
                        : fileToSubmit
                    )
                  )
                  console.log(event.target.files[0])
                }}
                // disabled={!!file.file} // not working
                type="file"
                accept={file.suffix.join(',')}
                id={`file-upload-${fileIndex}`}
                hidden
              />
            </div>
          ))}
        </UploadWrapper>
        <p style={{ fontSize: '0.8rem' }}>By uploading, you agree that this is your own, unaided work.</p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
