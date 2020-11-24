import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import FileItemRow from 'components/rows/FileItemRow'
import { Resource, ResourceUploadRequirement, ResourceUploadStatus } from 'constants/types'
import UploadResourceItemRow from 'components/rows/UploadResourceItemRow'
import {faDownload, faExclamation, faTrash, faUpload, faUsers, IconDefinition} from '@fortawesome/free-solid-svg-icons'
import { showFileSize } from 'utils/functions'
import moment from 'moment'
import Container from "react-bootstrap/cjs/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
  enableFileUpload: boolean
  requiredResources: ResourceUploadRequirement[]
  uploadFile: (file: File, index: number) => void
  removeFile: (index: number) => void
  downloadFile: (courseworkSubmissionID: number, filename: string, suffix: string) => void
  refresh: () => void
  onWarningSectionClick: (event: React.MouseEvent) => void
}

const SubmissionFileUploadTab: React.FC<Props> = ({
  enableFileUpload,
  requiredResources,
  uploadFile,
  removeFile,
  downloadFile,
  onWarningSectionClick,
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
    if (enableFileUpload) {
      if (uploadedFile) {
        return [
          [faDownload, e => downloadFile(uploadedFile.courseworkSubmissionID, uploadedFile.title, uploadedFile.suffix)],
          [faTrash, e => removeFile(uploadedFile.courseworkSubmissionID)],
        ]
      } else {
        return [
          [faUpload, _ => clickUpload(index)],
        ]
      }
    }
    return []
  }

  const tagsOf = (requirement: ResourceUploadRequirement): string[] => {
    if (requirement.uploadedFile) {
      return [
        moment(requirement.uploadedFile.timestamp).fromNow(),
        showFileSize(requirement.uploadedFile.size, 0),
      ]
    } else {
      return [
        "≤ " + showFileSize(requirement.maxSize, 0)
      ]
    }
  }

  const fileUploadSection = (
    <>
      <span>Requirements: </span>
      <input type="file" ref={uploadRef} onChange={e => onFileSelection(e)} style={{ display: "none" }}></input>
      {requiredResources.map((resource, index) => {
        const { title, allowedSuffixes, uploadedFile } = resource
        return (
          <div key={index}>
            <UploadResourceItemRow
              title={title}
              suffixes={(uploadedFile && [uploadedFile.suffix]) ?? allowedSuffixes}
              colour={uploadedFile ? "teal" : "pink"}
              respondingIcons={respondingIconsOf(uploadedFile, index)}
              tags={tagsOf(resource)}
            />
          </div>
        )
      })}
    </>
  )

  const warningSection = (
    <>
      <Container className={styles.warningSection} onClick={onWarningSectionClick}>
        <FontAwesomeIcon icon={faExclamation} style={{fontSize: "3.5rem", marginRight: "2rem"}}/>
        <span className={styles.warningLabel}>Your must be a group leader to submit your work!</span>
      </Container>
    </>
  )

  return (
    <div>
      {enableFileUpload || warningSection}
      {fileUploadSection}
    </div>
  )
}

export default SubmissionFileUploadTab