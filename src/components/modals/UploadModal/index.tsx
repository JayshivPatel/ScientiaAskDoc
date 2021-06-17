import React, {useCallback, useState} from "react"
import classNames from "classnames"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import {useDropzone} from "react-dropzone"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFolder, faFolderOpen, faTimes,} from "@fortawesome/free-solid-svg-icons"

import styles from "./style.module.scss"
import ResourceDetailForm, {ResourceDetails,} from "components/sections/ResourceDetailForm"
import {request} from "utils/api"
import {api, methods} from "constants/routes"

interface UploadModalProps {
  show: boolean
  onHide: any
  hideAndReload: () => void
  year: string
  course: string
  categories: string[]
  tags: string[]
  titleDuplicated: (category: string, title: string) => boolean
}

const UploadModal: React.FC<UploadModalProps> = ({
  show,
  onHide,
  hideAndReload,
  year,
  course,
  categories,
  tags,
  titleDuplicated,
}) => {
  const [tab, setTab] = useState("file")
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([])
  const [serverErrors, setServerErrors] = useState<
    { details: ResourceDetails; message: string }[]
  >([])
  const [resourceDetails, setResourceDetails] = useState<{
    [id: number]: ResourceDetails
  }>({})
  const MAX_SIZE = 50 * (2 ** 10) * (2 ** 10); // 50MB
  const [canUploadFile, setCanUploadFile] = useState<boolean>(false)
  const [canUploadLink, setCanUploadLink] = useState<boolean>(false)
  const [suppressErrorMsg, setSuppressErrorMsg] = useState<boolean>(true)
  const linkResourceDetailsID = -1;
  const linkResource = resourceDetails[linkResourceDetailsID];
  const prettyBytes = require("pretty-bytes")

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = rejectedFiles.filter(
        (file) => !acceptedFiles.includes(file)
      )
      setRejectedFiles(newFiles)
    },
    [rejectedFiles]
  )

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    minSize: 0,
    maxSize: MAX_SIZE,
    multiple: true,
  })

  const removeFile = (file: File) => {
    const newFiles = [...rejectedFiles, file]
    setRejectedFiles(newFiles)
  }

  const updateResourceDetails = (id: number) => {
    return (details: ResourceDetails) => {
      resourceDetails[id] = details
      setResourceDetails({ ...resourceDetails })
    }
  }

  const submitFileForResource = (file: File) => {
    let formData = new FormData()
    formData.append("file", file)
    return (data: { [k: string]: number }) => {
      request({
        api: api.MATERIALS_RESOURCES_FILE(data["id"]),
        method: methods.PUT,
        body: formData,
        sendFile: true,
      })
      .catch(() => removeFile(file))
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const makePayload = (details: ResourceDetails) => {
      let payload: { [key: string]: any } = {
        year: year,
        course: course,
        type: tab,
        title: details.title,
        category: details.category,
        tags: details.tags,
        path: details.url,
      }
      if (details.visibleAfter) {
        payload.visible_after = details.visibleAfter
      }
      return payload
    }

    const onError = (details: ResourceDetails) => {
      return (message: string) => {
        setServerErrors([
          ...serverErrors,
          {
            details: details,
            message: message,
          },
        ])
      }
    }

    switch (tab) {
      case "file": {
        await Promise.all(
          acceptedFiles.map((file, index) => {
            if (rejectedFiles.includes(file)) {
              // Empty promise i.e. do nothing
              return
            }
            return request({
              api: api.MATERIALS_RESOURCES(),
              method: methods.POST,
              body: makePayload(resourceDetails[index]),
            })
            .then(() => submitFileForResource(file))
            .catch(onError(resourceDetails[index]))
          })
        )

        if (serverErrors.length === 0) {
          hideAndReload()
        } else {
          // TODO: Handle errors
          console.log(serverErrors)
        }
        break
      }
      case "link": {
        // The title and url of the new link must be validated before uploading
          await request({
            api: api.MATERIALS_RESOURCES(),
            method: methods.POST,
            body: makePayload(linkResource),
          })
          .then(hideAndReload)
          .catch(onError(linkResource))
          break
      }
    }
  }

  return (
    <Modal
      style={{ zIndex: "10000" }}
      size="lg"
      show={show}
      onHide={onHide}
      centered
      className={styles.uploadModal}>
      <Modal.Header>
        <Modal.Title style={{ fontSize: "1.25rem" }}>
          Upload Resource
        </Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}>
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Tabs
            className={styles.tabContainer}
            style={{ marginTop: "1.25rem" }}
            activeKey={tab}
            onSelect={(tab) => setTab(tab ? tab : "file")}>
            <Tab eventKey="file" title="File">
              <div
                {...getRootProps({
                  className: classNames(
                    styles.dropzone,
                    styles.clickable,
                    isDragAccept
                      ? styles.accept
                      : isDragReject
                      ? styles.reject
                      : ""
                  ),
                })}>
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  icon={isDragActive ? faFolderOpen : faFolder}
                />
                <p>Click here or drag and drop files to upload.</p>
              </div>

              <Accordion defaultActiveKey="0">
                {acceptedFiles.length > 0 &&
                  acceptedFiles.map(
                    (file, index) =>
                      !rejectedFiles.includes(file) && (
                        <Card key={index}>
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey={`${index}`}
                            className={styles.clickable}>
                            <Row>
                              <Col md="auto">
                                <FontAwesomeIcon icon={faCaretDown} />
                              </Col>
                              <Col>
                                {file.name}
                                <span className={styles.filesizeDisplay}>
                                  {prettyBytes(file.size)}
                                </span>
                              </Col>
                              <Col md="auto">
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeFile(file)
                                  }}
                                />
                              </Col>
                            </Row>
                          </Accordion.Toggle>

                          <Accordion.Collapse eventKey={`${index}`} className={styles.collapse}>
                            <Card.Body>
                              <ResourceDetailForm
                                id={index}
                                key={index}
                                categories={categories}
                                tagList={tags}
                                isLink={false}
                                defaultTitle={file.name}
                                handleInvalidDetails={setCanUploadFile}
                                titleDuplicated={titleDuplicated}
                                setResourceDetails={updateResourceDetails(
                                  index
                                )}
                              />
                            </Card.Body>
                          </Accordion.Collapse>

                        </Card>
                      )
                  )}
              </Accordion>
            </Tab>

            <Tab eventKey="link" title="Link">
              <ResourceDetailForm
                id={-1}
                categories={categories}
                tagList={tags}
                isLink={true}
                titleDuplicated={titleDuplicated}
                setResourceDetails={updateResourceDetails(linkResourceDetailsID)}
                defaultTitle={linkResource?.title}
                defaultURL={linkResource?.url}
                defaultCategory={linkResource?.category}
                defaultTags={linkResource?.tags}
                defaultVisibleAfter={linkResource?.visibleAfter}
                suppressErrorMsg={suppressErrorMsg}
                setSuppressErrorMsg={setSuppressErrorMsg}
                handleInvalidDetails={(areDetailsValid: boolean) => {setCanUploadLink(areDetailsValid)}}
              />
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={styles.buttonUpload}
            style={{ marginBottom: "0rem" }}
            type="submit"
            disabled={!((tab === "file" && canUploadFile) || (tab !== "file" && canUploadLink))}
            variant="secondary">
            Upload
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UploadModal
