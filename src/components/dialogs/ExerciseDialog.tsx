import { formatInTimeZone } from 'date-fns-tz'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { Envelope, FileEarmark, FileEarmarkCheck, Trash3Fill, Upload } from 'react-bootstrap-icons'

import { LONDON_TIMEZONE } from '../../constants/global'
import { Exercise } from '../../constants/types'
import { useExercises } from '../../lib/exercises.service'
import { currentShortYear } from '../../lib/utilities.service'
import { ModulePill, SpecLink, UploadButton, UploadWrapper } from '../../styles/exerciseDialog.style'
import { Tabs } from '../Tabs'
import Dialog from './Dialog'

export interface FileToSubmit {
  name: string
  suffix: string[]
  max_size: number
  url?: string
  size?: number
  file?: File
  timestamp?: Date
}

const ExerciseDialog = ({
  open,
  onOpenChange,
  exercise,
}: {
  open: boolean
  onOpenChange: (_: boolean) => void
  exercise: Exercise
}) => {
  const { getExerciseMaterials, deleteFile, submitFile } = useExercises()

  interface Material {
    name: string
    suffix: string[]
    url: string
  }

  interface ExerciseOwner {
    shortcode: string
    email: string
    name: string | null
  }

  const [exerciseMaterials, setExerciseMaterials] = useState<any | null>(null)
  const [spec, setSpec] = useState<Material | null>(null)
  const [modelAnswers, setModelAnswers] = useState<Material[]>([])
  const [dataFiles, setDataFiles] = useState<Material[]>([])
  const [filesToSubmit, setFilesToSubmit] = useState<FileToSubmit[]>([])
  const [owner, setOwner] = useState<ExerciseOwner | null>(null)

  useEffect(() => {
    getExerciseMaterials({
      academicYear: currentShortYear(),
      yearGroup: 'c1',
      exerciseId: exercise.number,
      setExerciseMaterials,
    })
  }, [exercise])

  useEffect(() => {
    console.log({ exerciseMaterials })
    if (!exerciseMaterials) return
    setSpec(exerciseMaterials.spec)
    setModelAnswers(exerciseMaterials.model_answers)
    setDataFiles(exerciseMaterials.data_files)
    setFilesToSubmit(exerciseMaterials.hand_ins)
    setOwner(exerciseMaterials.owner)
  }, [exerciseMaterials])

  // Date format: https://date-fns.org/v2.29.1/docs/format
  const formatTimestamp = (date: Date | string) => formatInTimeZone(date, LONDON_TIMEZONE, 'E d LLL yyyy, h:mm aaa zzz')

  return (
    <Dialog {...{ open, onOpenChange }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>
          {exercise.type}: {exercise.title}
        </h3>
        {owner && (
          <address style={{ float: 'right' }}>
            <a
              title={'Email the exercise owner' + (owner.name ? `: ${owner.name} (${owner.shortcode})` : '')}
              href={`mailto:${owner.email}`}
            >
              <Envelope size={24} />
            </a>
          </address>
        )}
      </div>
      <ModulePill>
        {exercise.module_code}: {exercise.module_name}
      </ModulePill>
      {/* TODO: spec button placement not final - temporarily placed in centre. */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {spec && (
          <SpecLink target="_blank" href={spec.url}>
            View specification
          </SpecLink>
        )}
      </div>
      {/* convert tabs to <a href=""></a> */}
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'row' }}>
        {dataFiles.length !== 0 && (
          <div style={{ width: modelAnswers.length !== 0 ? '50%' : '100%', textAlign: 'center' }}>
            <h4>Data files</h4>
            <Tabs
              data={dataFiles}
              generator={(tab: any) => (
                <span style={{ textAlign: 'center', width: '100%' }}>
                  {tab.name}.{tab.suffix[0]}
                </span>
              )}
              onClick={(tab: any) => window.open(tab.url)}
            />
          </div>
        )}
        {modelAnswers.length !== 0 && (
          <div style={{ width: modelAnswers.length !== 0 ? '50%' : '100%', textAlign: 'center' }}>
            <h4>Model answers</h4>
            <Tabs
              data={modelAnswers}
              generator={(tab: any) => (
                <span style={{ textAlign: 'center', width: '100%' }}>
                  {tab.name}.{tab.suffix[0]}
                </span>
              )}
              onClick={(tab: any) => window.open(tab.url)}
            />
          </div>
        )}
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
                      // TODO: tell server to delete submission
                      deleteFile(file)
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
                  // TODO: on cancel of file browser: dont remove submission
                  if (event.target.files === null) return
                  // if (exercise.endDate > new Date()) return
                  submitFile(event.target.files[0])
                  setFilesToSubmit((filesToSubmit: FileToSubmit[]) =>
                    filesToSubmit.map((fileToSubmit, index) =>
                      index === fileIndex
                        ? { ...fileToSubmit, file: event.target.files![0], timestamp: new Date() }
                        : fileToSubmit
                    )
                  )
                  console.log(event.target.files[0])
                }}
                // disabled={exercise.endDate > new Date()}
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
