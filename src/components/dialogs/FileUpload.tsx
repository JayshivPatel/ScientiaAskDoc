import { RequiredFile } from ''

const UploadFile = ({ requiredFile }: { requiredFile: RequiredFile }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        verticalAlign: 'middle',
      }}
    >
      <UploadButton
        css={{
          backgroundColor: '$sand1',
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {file.file ? (
            <CheckLg
              size={24}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            />
          ) : (
            <FileEarmark
              size={24}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            />
          )}
          <div
            style={{
              marginLeft: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p>{file.name}</p>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#8F908C', // = $sand9
              }}
            >
              {'.' + file.suffix.join(', .')}
            </p>
          </div>
        </div>
        {file.file ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p>{file.file?.name}</p>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#8F908C', // = $sand9
              }}
            >
              {`${file.timestamp && displayTimestamp(file.timestamp) + '•'} ${prettyBytes(
                file.file.size
              )}`}
            </p>
          </div>
        ) : (
          <Upload size={24} />
        )}
        {file.file && (
          <TrashButton
            size={24}
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
        type="file"
        onChange={(event) => {
          console.log(event.target)
          // TODO: on cancel of file browser: dont remove submission
          if (event.target.files === null) return
          // if (exercise.endDate > new Date()) return
          submitFile(event.target.files[0])
          setFilesToSubmit((filesToSubmit: FileToSubmit[]) =>
            filesToSubmit.map((fileToSubmit, index) =>
              index === fileIndex
                ? {
                    ...fileToSubmit,
                    file: event.target.files![0],
                    timestamp: new Date(),
                  }
                : fileToSubmit
            )
          )
          console.log(event.target.files[0])
        }}
        // disabled={exercise.endDate > new Date()}
        accept={'.' + file.suffix.join(', .')}
        id={`file-upload-${fileIndex}`}
        hidden
      />
    </div>
  )
}
export default FileUpload
