import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { Check, Envelope, FileEarmark, FileEarmarkCheck, Trash3Fill, Upload } from 'react-bootstrap-icons'

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
    setSpec(exerciseMaterials.spec)
    setModelAnswers(exerciseMaterials.model_answers)
    setDataFiles(exerciseMaterials.data_files)
    setFilesToSubmit(exerciseMaterials.hand_ins)
  }, [exerciseMaterials])

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const formatTimestamp = (date: Date | string) => formatInTimeZone(date, LONDON_TIMEZONE, 'd LLL yyyy, h:mm aaa zzz')

  return (
    <Dialog {...{ open, onOpenChange }}>
      <h3>
        {exercise.type}: {exercise.title}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ModulePill>
          {exercise.module_code}: {exercise.module_name}
        </ModulePill>
        <address>
          <a
            title="Email the exercise owner: Andrea Callia D'Iddio (username)"
            href="mailto:a.callia-diddio14@imperial.ac.uk"
          >
            <Envelope size={24} />
          </a>
        </address>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Resources</h4>
        {spec && (
          <Tabs
            data={[spec]}
            generator={(tab: any) => (
              <span>
                {tab.name}.{tab.suffix}
              </span>
            )}
            onClick={(tab: any) => window.open(tab.url)}
          />
        )}
        <Tabs
          data={dataFiles}
          generator={(tab: any) => (
            <span>
              {tab.name}.{tab.suffix}
            </span>
          )}
          onClick={(tab: any) => window.open(tab.url)}
        />
        <Tabs
          data={modelAnswers}
          generator={(tab: any) => (
            <span>
              {tab.name}.{tab.suffix}
            </span>
          )}
          onClick={(tab: any) => window.open(tab.url)}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>Submission</h4>
        <p style={{ fontSize: '14px', color: '$sand8' }}>Deadline: {formatTimestamp(exercise.endDate)}</p>
        <UploadWrapper>
          {filesToSubmit.map((file, fileIndex) => (
            <div
              key={fileIndex}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                verticalAlign: 'middle',
              }}
            >
              <UploadButton
                css={{
                  backgroundColor: file.file ? '$green5' : '$sand1',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.06)) drop-shadow(0 1px 3px rgba(0,0,0,.1))',
                  marginTop: '1rem',
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                htmlFor={`file-upload-${fileIndex}`}
              >
                {file.file ? (
                  <FileEarmarkCheck
                    size={20}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  />
                ) : (
                  <FileEarmark
                    size={20}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  />
                )}
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {file.name}
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {'.' + file.suffix.join(', .')}
                </p>

                {file.file ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <p style={{}}>{file.file?.name}</p>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#8F908C', // = $sand9
                      }}
                    >
                      {`${file.timestamp && formatTimestamp(file.timestamp) + '•'} ${prettyBytes(file.file.size)}`}
                    </p>
                  </div>
                ) : (
                  <Upload />
                )}
                {file.file && (
                  <Trash3Fill
                    style={{ fontSize: '1rem' }}
                    onClick={(event) => {
                      console.log({ filesToSubmit })
                      setFilesToSubmit((filesToSubmit: any) =>
                        filesToSubmit.map((fileToSubmit: any, index: number) =>
                          index === fileIndex ? { ...fileToSubmit, file: undefined } : fileToSubmit
                        )
                      )
                      event.preventDefault()
                    }}
                  />
                )}
              </UploadButton>

              <input
                onChange={(event) => {
                  console.log(event.target)
                  if (event.target.files === null) return // clear
                  // submitFileToExercise(event.target.files[0])
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
                accept={'.' + file.suffix.join(', .')}
                id={`file-upload-${fileIndex}`}
                hidden
              />
            </div>
          ))}
        </UploadWrapper>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          By uploading, you agree that this is your own, unaided work.
        </p>
      </div>
    </Dialog>
  )
}

export default ExerciseDialog
