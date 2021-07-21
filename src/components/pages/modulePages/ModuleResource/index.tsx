import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from "./style.module.scss"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import { api, methods } from "constants/routes"
import { request } from "utils/api"

export interface ModuleResourceProps {
  year: string,
  course: string,
  category: string,
  index: number
}

const ModuleResource: React.FC<ModuleResourceProps> = ({
  year,
  course,
  category,
  index,
}) => {

  let history = useHistory()
  const [pdfURL, setPdfURL] = useState("")
  const [error, setError] = useState("")

  const openResource = (data: { [k: string]: any }[]) => {
    const resource = data.find(r =>
      r.category === category && r.index === index)
    if (resource === undefined) {
      return
    }
    if (resource.type === "link" || resource.type === "video") {
      window.open(resource.path, "_blank")
      history.goBack()
      return
    }

    const resourceId = resource.id
    request({
      url: api.MATERIALS_RESOURCES_FILE(resourceId),
      method: methods.GET,
      onSuccess: (blob: Blob) => setPdfURL(URL.createObjectURL(blob)),
      onError: (message: string) => setError(message),
      returnBlob: true
    })
  }

  useEffect(() => {
    if (pdfURL === "") {
      request({
        url: api.MATERIALS_RESOURCES,
        method: methods.GET,
        body: {
            "year": year,
            "course": course,
            "category": category
        },
        onSuccess: openResource,
      onError: (message: string) => setError(message),
      })
    }
  })

  if (error) {
    return <WarningJumbotron
            message={`There was an error fetching this resource: ${error}`}
           />
  }
  return (
      <iframe
        title="PDF"
        src={pdfURL}
        className={window.innerWidth <= 1024 ?
          styles.pdfViewerMobile :
          styles.pdfViewer}
        >
      </iframe>
  )
}

export default ModuleResource