import React, { useRef, useState } from 'react'
import styles from './style.module.scss'
import FileItemRow from 'components/rows/FileItemRow'
import { Resource, ResourceUploadRequirement, ResourceUploadStatus } from 'constants/types'
import UploadResourceItemRow from 'components/rows/UploadResourceItemRow'
import { faDownload, faTrash, faUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Props {
  requiredResources: ResourceUploadRequirement[]
  uploadFile: (file: File, index: number) => void
  removeFile: (index: number) => void
  downloadFile: (url: string, filename: string, suffix: string) => void
  refresh: () => void
}

const SubmissionFileUploadTab: React.FC<Props> = ({
  requiredResources,
  uploadFile,
  removeFile,
  downloadFile,
}) => {

  const uploadRef = useRef<HTMLInputElement>(null)
  const [uploadIndex, setUploadIndex] = useState<number>(0)

  const onFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    file && uploadFile(file, uploadIndex)
  }

  const clickUpload = (index: number) => {
    setUploadIndex(index)
    uploadRef.current?.click()
  }

  const respondingIconsOf = (
    uploadedFile: ResourceUploadStatus | undefined, 
    index: number
  ): [IconDefinition, (e: React.MouseEvent) => void][] => {
    if (uploadedFile) {
      return [
        [faDownload, e => downloadFile(uploadedFile.url, uploadedFile.title, uploadedFile.suffix)],
        [faTrash, e => removeFile(index)],
      ]
    } else {
      return [
        [faUpload, _ => clickUpload(index)],
      ]
    }
  }

  return (
    <div>
      <span>Requirements: </span>
      <input type="file" ref={uploadRef} onChange={e => onFileSelection(e)} style={{ display: "none" }}></input>
      {requiredResources.map(({ title, allowedSuffixes, uploadedFile }, index) => {
        return (
          <div>
            <UploadResourceItemRow
              title={title}
              suffixes={(uploadedFile && [uploadedFile.suffix]) ?? allowedSuffixes}
              colour={uploadedFile ? "teal" : "pink"}
              respondingIcons={respondingIconsOf(uploadedFile, index)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default SubmissionFileUploadTab