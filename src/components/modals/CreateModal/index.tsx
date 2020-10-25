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
import CreatableSelect from 'react-select/creatable';

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

  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  // switch for provision online
  const [provOnlineSwitch, setProvOnlineSwitch] = useState(false);
  const provOnlineSwitchAction = () => {
    setProvOnlineSwitch(!provOnlineSwitch);
  };

  // state for assessed/unassessed cw
  const [isAssessed, setAssessed] = useState(false);
  const assesedAction = () => {
    setAssessed(!isAssessed);
  }

  // state for individual/group cw
  const [isGrouped, setGrouped] = useState(false);
  const isGroupAction = () => {
    setGrouped(!isGrouped);
  }

  // state for handin types
  const [handinTypes] = useState([
    {type: "Hardcopy", value: 0},
    {type: "Electronic", value: 1},
    {type: "Hardcopy and Electronic", value: 2}
  ]);
  const [handinType, setHandinType] = useState(0);
  const sethandinHardcopy = () => {
    setHandinType(0)
  };
  const sethandinElectronic = () => {
    setHandinType(1)
  };
  const sethandinHardcopyAndElectronic = () => {
    setHandinType(2)
  };

  // state for provision of mark schema
  const [provSchemaSwitch, setSchemaSwitch] = useState(false);
  const provSchemaSwitchAction = () => {
    setSchemaSwitch(!provSchemaSwitch);
  };


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


            <Tab eventKey="info" title={"Exercise info"}>
              <Row style={{paddingTop: "10px"}}>
                <Col className={styles.Col}>
                  ♥Number:
                  <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={page_options}
                    className={styles.SelectArea}
                  />
                </Col>

                <Col className={styles.Col}>
                  ♥Exercise Type:
                  <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={type_options}
                    className={styles.SelectArea}
                  />
                </Col>
              </Row>

              <Row>
                <Col className={styles.Col}>
                  ♥Start Date:
                  <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={date_options}
                    className={styles.SelectArea}
                  />
                </Col>

                <Col className={styles.Col}>
                  ♥End Date:
                  <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={date_options}
                    className={styles.SelectArea}
                  />
                </Col>
              </Row>

              <Form.Row>
                <Col className={styles.Col}>
                  ♥Short Title:
                  <Form.Control placeholder="Short Title"
                                className={styles.TextArea}/>
                </Col>
              </Form.Row>

              <Row>
                <Col className={styles.Col}>
                  ♥Provision of Online Spec
                  <Form.Switch onChange={provOnlineSwitchAction}
                               id={"custon-switch"}
                               checked={{provOnlineSwitch}}
                               className={styles.Switch}
                  />

                </Col>
              </Row>

              <Row>
                <Col className={styles.Col}>
                  ♥Provision of data files
                  <Form.Switch onChange={provOnlineSwitchAction}
                               id={"custon-switch"}
                               checked={{provOnlineSwitch}}
                               className={styles.Switch}
                  />

                </Col>
              </Row>

              <Row>
                <Col className={styles.Col}>
                  ♥Visibility for student after:
                  <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={time_options}
                    className={styles.SelectArea}
                    placeholder={"Select a time"}
                  />
                </Col>
              </Row>

              <hr/>

              <Row>
                <Col>
                  ※Type of assenment
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Check onChange={assesedAction} checked={isAssessed} label="※Not assessed"/>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Check onChange={assesedAction} checked={!isAssessed} label="※Assessed 👉 "/>
                </Col>

                <Col>
                  <Row>
                    <Form.Check onChange={isGroupAction} checked={!isGrouped} label={"※Individual"}/>
                  </Row>
                  <Row>
                    <Form.Check onChange={isGroupAction} checked={isGrouped} label={"※Group"}/>
                  </Row>

                </Col>

                <Col>
                  <Row>
                    ※Submission:
                  </Row>

                  <Col>
                    <Row>
                      <Form.Check onChange={sethandinHardcopy} checked={handinType === 0} label="Hardcopy"/>
                    </Row>

                    <Row>
                      <Form.Check onChange={sethandinElectronic} checked={handinType === 1} label="Electronic"/>
                    </Row>

                    <Row>
                      <Form.Check onChange={sethandinHardcopyAndElectronic} checked={handinType === 2}
                                  label="Hardcopy AND Electronic"/>
                    </Row>
                  </Col>
                </Col>


                <Col>
                  <Row>
                    ※hardcopy due time:
                    <CreatableSelect
                      isClearable
                      onChange={handleChange}
                      onInputChange={handleInputChange}
                      options={time_options}
                      className={styles.SelectArea_time}
                      placeholder={"Select a time"}
                    />
                  </Row>

                  <Row>
                    ※electronic due time:
                    <CreatableSelect
                      isClearable
                      onChange={handleChange}
                      onInputChange={handleInputChange}
                      options={time_options}
                      className={styles.SelectArea_time}
                      placeholder={"Select a time"}
                    />
                  </Row>
                </Col>
              </Row>

              <hr/>

              <Row>
                <Col className={styles.Col}>
                  ※Provision of on-line mark schema:
                  <Form.Switch onChange={provSchemaSwitchAction}
                               id={"custon-switch"}
                               checked={{provSchemaSwitch}}
                               className={styles.Switch}
                  />
                </Col>
              </Row>

              <Row>
                <Col className={styles.Col}>
                  Maximum mark (0-100):
                  <Form.Control type="number" className={styles.TextArea} min={0} max={100} defaultValue={100}/>
                </Col>


                <Col className={styles.Col}>
                  Weigh(%) within module:
                  <Form.Control type="number" className={styles.TextArea} min={0} max={100} placeholder={"%"}/>
                </Col>
              </Row>

              <hr/>

              <Row>
                <Col>
                  ※Provision of on-line answers:
                  <Col>
                    <Form.Row>
                      <Form.Check label="No"/>
                    </Form.Row>

                    <Form.Row>
                      <Col>
                        <Form.Check label="Yes 👉 "/>
                      </Col>

                      <Col className={styles.Col}>
                        Visible to students after:
                        <Form.Control type="number" min={0} max={5} defaultValue={2}/>Weeks
                      </Col>
                    </Form.Row>
                  </Col>
                </Col>
              </Row>


              <hr/>

              <div style={{textAlign: "center"}}>
                Upload spec file for this exercise
              </div>

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
