import React from 'react'
import styles from './style.module.scss'
import FileItemRow from 'components/rows/FileItemRow'
import { Resource, ResourceUploadRequirement, ResourceUploadStatus } from 'constants/types'
import UploadResourceItemRow from 'components/rows/UploadResourceItemRow'
import { faDownload, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

interface Props {
  requiredResources: ResourceUploadRequirement[]
  uploadedResources: ResourceUploadStatus[]
}

const SubmissionFileUpload: React.FC<Props> = ({
  requiredResources,
  uploadedResources,
}) => {

  return (
    <div>
      <span>Requirements: </span>
      {requiredResources.map(({ title, allowedSuffixes, }) => {
        return <UploadResourceItemRow
          title={title}
          suffixes={allowedSuffixes}
          colour="pink"
          respondingIcons={[
            [faUpload, e => alert("uploading")],
          ]}
        />
      })}

      <span>Uploaded resources: </span>
      {uploadedResources.map(({ title, suffix, }) => (
        <UploadResourceItemRow
          title={title}
          suffixes={[suffix]}
          colour="teal"
          respondingIcons={[
            [faDownload, e => alert("downloading")],
            [faTrash, e => alert("deleting")],
          ]}
        />
      ))}
    </div>
  )
}

export default SubmissionFileUpload