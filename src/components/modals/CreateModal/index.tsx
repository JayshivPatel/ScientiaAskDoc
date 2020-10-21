import React, {useState, useCallback, useEffect} from "react"
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
import {
  faCaretDown,
  faTimes,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"

import styles from "./style.module.scss"
import ResourceDetailForm, {
  ResourceDetails,
} from "components/sections/ResourceDetailForm"
import {request} from "utils/api"
import {api, methods} from "constants/routes"
import moment from "moment"

interface CreateModalProps {
  show: boolean
  onHide: any
  hideAndReload: () => void
  year: string
  course: string
  categories: string[]
  tags: string[]
  titleDuplicated: (category: string, title: string) => boolean
}


const CreateModal: React.FC<CreateModalProps> = ({
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
  const [serverErrors, setServerErrors] = useState<{ details: ResourceDetails; message: string }[]>([])
  const [resourceDetails, setResourceDetails] = useState<{
    [id: number]: ResourceDetails
  }>({})
  const [canUploadFile, setCanUploadFile] = useState<boolean>(false)
  const [canUploadLink, setCanUploadLink] = useState<boolean>(false)
  const [suppressErrorMsg, setSuppressErrorMsg] = useState<boolean>(true)

  const maxSize = 25 * (2 ** 10) * (2 ** 10); // 25mb
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
    maxSize,
    multiple: true,
  })

  const removeFile = (file: File) => {
    const newFiles = [...rejectedFiles, file]
    setRejectedFiles(newFiles)
  }

  const updateResourceDetails = (id: number) => {
    return (details: ResourceDetails) => {
      resourceDetails[id] = details
      setResourceDetails({...resourceDetails})
    }
  }

  const submitFileForResource = (file: File) => {
    let formData = new FormData()
    formData.append("file", file)
    return (data: { [k: string]: number }) => {
      request({
        url: api.MATERIALS_RESOURCES_FILE(data["id"]),
        method: methods.PUT,
        onSuccess: () => {
        },
        onError: () => removeFile(file),
        body: formData,
        sendFile: true,
      })
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
              return Promise.resolve()
            }
            return request({
              url: api.MATERIALS_RESOURCES,
              method: methods.POST,
              onSuccess: submitFileForResource(file),
              onError: onError(resourceDetails[index]),
              body: makePayload(resourceDetails[index]),
            })
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
      // case "create": {
      //   await request({
      //     url: api.MATERIALS_RESOURCES,
      //     method: methods.POST,
      //     onSuccess: hideAndReload,
      //     onError: onError(linkResource),
      //     body: makePayload(linkResource),
      //   })
      //   break
      // }
    }
  }

  const [page_options] = React.useState([
    {label: "1", value: 1},
    {label: "2", value: 2},
    {label: "3", value: 3},
    {label: "4", value: 4},
    {label: "5", value: 5},
    {label: "6", value: 6},
    {label: "7", value: 7},
    {label: "8", value: 8},
    {label: "9", value: 9},
    {label: "10", value: 10}
  ]);

  const [type_options] = React.useState([
    {label: "Tutorial", value: 1},
    {label: "Coursework", value: 2},
    {label: "Computer-based Tutorial", value: 3},
    {label: "Computer-based_coursework", value: 4},
    {label: "Laboratory", value: 5},
    {label: "MMT", value: 6},
    {label: "PMT", value: 7},
    {label: "PPT", value: 8},
    {label: "Report", value: 9},
    {label: "Essay", value: 10},
    {label: "Project", value: 8},
    {label: "TEST", value: 9},
    {label: "ON-LINE TEST", value: 9},
    {label: "RESIT TEST", value: 9},
    {label: "RESIT ON-LONE TEST", value: 9},
    {label: "EXAM QUESTION", value: 9},
    {label: "GROUP FORMATION", value: 9}
  ]);

  // options for dates:
  const date = moment().toDate()
  const dates = []
  for (let i = 1; i <= 14; i++) {
    dates.push({label: new Date(date.setDate(date.getDate() + 1)).toDateString(), value: i})
  }
  const [date_options] = React.useState(dates);

  // time options:
  const origin_time = new Date().setHours(0, 0, 0, 0)
  const time_wholeday = []
  for (let i = 0; i < 24; i++) {
    time_wholeday.push({label: new Date(date.setHours(i, 0, 0, 0)).toTimeString(), value: i})
  }
  const [time_options] = React.useState(time_wholeday)

  function Checkbox({title}: { title: string }, {isChecked}: { isChecked: boolean }) {
    const [checked, setChecked] = React.useState(true);

    return (
      <label>
        <input type="checkbox"
               checked={isChecked}
               onChange={() => setChecked(!checked)}
        />
        {title}
      </label>
    );
  }

  return (
    <Modal
      style={{zIndex: "10000"}}
      size="lg"
      show={show}
      onHide={onHide}
      centered
      className={styles.createModal}>
      <Modal.Header>
        <Modal.Title style={{fontSize: "1.25rem"}}>
          Create a new exercise
        </Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}>
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes}/>
        </Button>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Tabs
            className={styles.tabContainer}
            style={{marginTop: "1.25rem"}}
            onSelect={(tab) => setTab(tab ? tab : "file")}>
            <Tab eventKey="info" title={"Excercise info"}>
              <Row>
                <Col>
                  ♥Number:
                  <select>
                    {page_options.map(({label, value}) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Col>

                <Col>
                  ♥Exercise Type:
                  <select>
                    {type_options.map(({label, value}) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col>
                  ♥Start Date:
                  <select>
                    {date_options.map(({label, value}) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Col>

                <Col>
                  ♥End Date:
                  <select>
                    {date_options.map(({label, value}) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <form>
                    <label>
                      ♥Short Title:
                      <input type="text" name="name"/>
                    </label>
                  </form>
                </Col>
              </Row>

              <Row>
                <Col>
                  ♥Provision of Online Spec.
                  <Col>
                    <Checkbox title="Yes"/> <Checkbox title="No"/>
                  </Col>

                </Col>

                <Col>
                  ♥Provision of data files.
                  <Col>
                    <Checkbox title="Yes"/> <Checkbox title="No"/>
                  </Col>

                </Col>

                <Col>
                </Col>
              </Row>

              <Row>
                <Col>
                  ♥Visibility for student after:
                </Col>
              </Row>

              // TODO: add a line here to separate.

              <Row>
                <Col>
                  ※Type of assenment
                </Col>
              </Row>

              <Row>
                <Col>
                  <Checkbox title="※Not assessed"/>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Checkbox title="※Assessed"/>
                </Col>

                <Col>
                  <Row>
                    <Checkbox title={"※Individual"}/>
                  </Row>
                  <Row>
                    <Checkbox title={"※Group"}/>
                  </Row>

                </Col>

                <Col>
                  <Row>
                    ※Submission:
                  </Row>

                  <Col>
                    <Row>
                      <Checkbox title="Hardcopy"/>
                    </Row>

                    <Row>
                      <Checkbox title="Electronic"/>
                    </Row>

                    <Row>
                      <Checkbox title="Hardcopy AND Electronic"/>
                    </Row>
                  </Col>
                </Col>


                <Col>
                  <Row>
                    ※hardcopy due time:
                    <select>
                      {time_options.map(({label, value}) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </Row>

                  <Row>
                    ※electronic due time:
                    <select>
                      {time_options.map(({label, value}) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </Row>
                </Col>

              </Row>

              <Row>
                <Col>
                  ※Provision of on-line mark schema:
                  <Col>
                    <Checkbox title="No"/> <Checkbox title="Yes"/>
                  </Col>

                  <Col>
                    Maximum mark (0-100):
                    <input type="number" min={0} max={100} defaultValue={100}></input>
                  </Col>


                  <Col>
                    Weigh(%) within module:
                    <input type="number" min={0} max={100} placeholder={"%"}></input>
                  </Col>
                </Col>
              </Row>

              // TODO: a line here to separate

              <Row>
                <Col>
                  ※Provision of on-line answers:
                  <Col>
                    <Row>
                      <Checkbox title="No"/>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox title="Yes 👉 "/>
                      </Col>
                      <Col>
                        Visible to students after:
                        <input type="number" min={0} max={5} defaultValue={2}></input>Weeks
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>

            </Tab>

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

              <Accordion>
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
                              <FontAwesomeIcon icon={faCaretDown}/>
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

            {/*<Tab eventKey="link" title="Link">*/}
            {/*  <ResourceDetailForm*/}
            {/*    id={-1}*/}
            {/*    categories={categories}*/}
            {/*    tagList={tags}*/}
            {/*    isLink={true}*/}
            {/*    titleDuplicated={titleDuplicated}*/}
            {/*    setResourceDetails={updateResourceDetails(linkResourceDetailsID)}*/}
            {/*    defaultTitle={linkResource?.title}*/}
            {/*    defaultURL={linkResource?.url}*/}
            {/*    defaultCategory={linkResource?.category}*/}
            {/*    defaultTags={linkResource?.tags}*/}
            {/*    defaultVisibleAfter={linkResource?.visibleAfter}*/}
            {/*    suppressErrorMsg={suppressErrorMsg}*/}
            {/*    setSuppressErrorMsg={setSuppressErrorMsg}*/}
            {/*    handleInvalidDetails={(areDetailsValid: boolean) => {setCanUploadLink(areDetailsValid)}}*/}
            {/*  />*/}
            {/*</Tab>*/}
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={styles.buttonUpload}
            style={{marginBottom: "0rem"}}
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

export default CreateModal
