import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import styles from "./style.module.scss"
import Dandruff from "components/headings/Dandruff"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import { api, methods } from "constants/routes"
import { Resource } from "constants/types"
import { request } from "utils/api"

export interface ModuleResourceProps {
  moduleTitle: string
  year: string
  course: string
  category: string
  index: number
}

const ModuleResource: React.FC<ModuleResourceProps> = ({
  moduleTitle,
  year,
  course,
  category,
  index,
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

  const cssClass =
    window.innerWidth <= 1024
      ? styles.moduleResourceMobile
      : styles.moduleResource

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
    <>
      <Helmet>
        <title>
          {pdfInfo.filename} | {moduleTitle} | Scientia
        </title>
      </Helmet>
      <div className={cssClass}>
        <Dandruff heading={pdfInfo.filename} />
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
