import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./style.module.scss"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import { api, methods } from "constants/routes"
import { Resource } from "constants/types"
import { downloadBlob, request } from "utils/api"

export interface ModuleResourceProps {
  moduleTitle: string
  year: string
  course: string
  category: string
  index: number
  showSidebars: () => void
  hideSidebars: () => void
}

const ModuleResource: React.FC<ModuleResourceProps> = ({
  moduleTitle,
  year,
  course,
  category,
  index,
  showSidebars,
  hideSidebars,
}) => {
  const [pdfInfo, setPdfInfo] = useState({
    filename: "",
    api_url: "",
    blob_url: "",
  })
  const [error, setError] = useState("")

  const openResource = (resources: Resource[]) => {
    const resource = resources.find(
      (r) => r.category === category && r.index === index
    )
    if (resource) {
      request({
        endpoint: api.MATERIALS_RESOURCES_FILE(resource.id),
        method: methods.GET,
        onSuccess: (blob: Blob) =>
          setPdfInfo({
            filename: resource.title,
            api_url: api.MATERIALS_RESOURCES_FILE(resource.id).url,
            blob_url: URL.createObjectURL(blob),
          }),
        onError: (message: string) => setError(message),
        returnBlob: true,
      })
    }
  }

  useEffect(() => {
    hideSidebars()
    return function cleanup() {
      showSidebars()
    }
  })

  useEffect(() => {
    if (pdfInfo.filename === "") {
      request({
        endpoint: api.MATERIALS_RESOURCES,
        method: methods.GET,
        body: {
          year: year,
          course: course,
          category: category,
        },
        onSuccess: openResource,
        onError: (message: string) => setError(message),
      })
    }
  }, [pdfInfo])

  if (error) {
    return (
      <div className={styles.moduleResource}>
        <WarningJumbotron
          message={`There was an error fetching this resource: ${error}`}
        />
      </div>
    )
  }
  return (
    <>
      <Helmet>
        <title>
          {pdfInfo.filename} | {moduleTitle} | Scientia
        </title>
      </Helmet>
      <div className={styles.moduleResource}>
        <Button
          onClick={() => {
            downloadBlob(pdfInfo.blob_url, pdfInfo.filename)
          }}>
          Download
          <FontAwesomeIcon icon={faDownload} />
        </Button>
        <iframe
          title="PDF"
          src={pdfInfo.blob_url}
          className={styles.pdfViewer}
        />
      </div>
    </>
  )
}

export default ModuleResource
