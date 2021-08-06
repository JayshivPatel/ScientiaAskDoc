import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./style.module.scss"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import { api, methods } from "constants/routes"
import { Resource } from "constants/types"
import { downloadBlob, request } from "utils/api"

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
  const [pdfInfo, setPdfInfo] = useState({
    filename: "",
    api_url: "",
    blob_url: ""
  })
  const [error, setError] = useState("")

  const openResource = (resources: Resource[]) => {
    const resource = resources.find(r =>
      r.category === category && r.index === index)
    if (resource) {
      if (resource.type === "link" || resource.type === "video") {
        window.open(resource.path, "_blank")
        history.goBack()
      } else {
        request({
          url: api.MATERIALS_RESOURCES_FILE(resource.id),
          method: methods.GET,
          onSuccess: (blob: Blob) => setPdfInfo({
            filename: resource.title,
            api_url: api.MATERIALS_RESOURCES_FILE(resource.id),
            blob_url: URL.createObjectURL(blob)
          }),
          onError: (message: string) => setError(message),
          returnBlob: true
        })
      }
    }
  }

  useEffect(() => {
    if (pdfInfo.filename === "") {
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
  }, [pdfInfo])

  const cssClass = window.innerWidth <= 1024 ?
    styles.moduleResourceMobile :
    styles.moduleResource

  if (error) {
    return (
      <div className={cssClass}>
        <WarningJumbotron
          message={`There was an error fetching this resource: ${error}`}
        />
      </div>
    )
  }
  return (
    <div className={cssClass}>
      <Button
        onClick={() => {
          downloadBlob(pdfInfo.blob_url, pdfInfo.filename)
        }}
      >
        Download
        <FontAwesomeIcon
          icon={faDownload}
        />
      </Button>
      <iframe
        title="PDF"
        src={pdfInfo.blob_url}
        className={styles.pdfViewer}
      />
    </div>
  )
}

export default ModuleResource