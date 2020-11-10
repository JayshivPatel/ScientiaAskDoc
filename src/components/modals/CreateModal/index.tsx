import React, {useState, useCallback, useEffect} from "react"
import classNames from "classnames"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import DatePicker from "react-datepicker"
import {useDropzone} from "react-dropzone"
import "react-datepicker/dist/react-datepicker.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faTimes,
  faFolder,
  faFolderOpen,
  faEye,
  faArrowAltCircleRight,
  faCalendarAlt,
  faClock,
  faUser,
  faUsers,
  faFileUpload,
  faPen,
  faFileAlt,
  faChevronCircleDown, faBars, faFileSignature
} from "@fortawesome/free-solid-svg-icons"

import styles from "./style.module.scss"
import ResourceDetailForm, {
  ResourceDetails,
} from "components/sections/ResourceDetailForm"
import {oldRequest} from "utils/api"
import {api, methods} from "constants/routes"
import moment from "moment"
import CreatableSelect from 'react-select/creatable';
import Container from "react-bootstrap/cjs/Container";
import Select from "react-select";

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
  const [canUploadFile, setCanUploadFile] = useState<boolean>(true)
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
      oldRequest({
        url: api.MATERIALS_RESOURCES_FILE(data["id"]).url,
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
            return oldRequest({
              url: api.MATERIALS_RESOURCES().url,
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

  const [typeOptions] = React.useState([
    {label: "Tutorial", value: 1},
    {label: "Coursework", value: 2},
    {label: "MMT", value: 3},
    {label: "PMT", value: 4},
    {label: "PPT", value: 5},
    {label: "Exam", value: 6},
    {label: "Test", value: 7},
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

  // switch for provision online spec
  const [provOnlineSwitch, setProvOnlineSwitch] = useState(false);
  const provOnlineSwitchAction = () => {
    setProvOnlineSwitch(!provOnlineSwitch);
  };

  // state for provision online data
  const [provOnlineDataSwitch, setProvOnlineDataSwitch] = useState(false);
  const provOnlineDataSwitchAction = () => {
    setProvOnlineDataSwitch(!provOnlineDataSwitch);
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
  };

  // state for provision of mark schema
  const [provSchemaSwitch, setSchemaSwitch] = useState(false);
  const provSchemaSwitchAction = () => {
    setSchemaSwitch(!provSchemaSwitch);
  };

  // state for provision of answer
  const [provOnlineAnswerSwitch, setProvOnlineAnswerSwitch] = useState(false);
  const provOnlineAnswerSwitchAction = () => {
    setProvOnlineAnswerSwitch(!provOnlineAnswerSwitch);
  };


    const [dateStart, setDateStart] = useState<Date>(new Date());
    const [dateDue, setDateDue] = useState<Date>(new Date());

    const [weigh_options] = useState([
        {label: "Average", value: -1},
    ]);

  const dateInfoLabels = [
    "Start date:",
    "Due date:",
  ]

    const [showPicker, setShowPicker] = useState(true);

    const datePicker_start = (
        <DatePicker
            className={styles.datePicker}
            selected={dateStart}
            onChange={(date: Date) => {
                setDateStart(date);
                setDateDue(date)
            }}
            showTimeInput
            timeFormat="HH:mm"
            dateFormat="d/M/yyyy HH:mm 'UTC'"
        />
    );

    const datePicker_due = (
        <DatePicker
            className={styles.datePicker}
            selected={dateDue}
            onChange={(date: Date) => {
                setDateDue(date)
                if (date.getUTCDate() < dateStart.getUTCDate()) {
                    setDateDue(dateStart);
                    console.warn("Cannot set due date before start date!");
                    window.alert("Cannot set due date before start date!")
                }
            }}
            showTimeInput
            timeFormat="HH:mm"
            dateFormat="d/M/yyyy HH:mm 'UTC'"
        />
    );

    /* TODO: Needs to add callbacks to handle value change */
    const createDateInfoRow = (label: string, datePicker: any) => (
        <Row className={styles.Row} md={2}>
            <Col md={2} style={{paddingLeft: 0}}>
        <span className={styles.infoLabel}>
          <FontAwesomeIcon icon={faCalendarAlt} className={styles.font}/>
            {label}
        </span>
            </Col>
            <Col md={10}>
                {datePicker}
            </Col>
        </Row>
    );


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
          <Container>
            <Row className={styles.Row} md={2}>
              <Col className={styles.Col} md={2} style={{paddingLeft: 0}}>
                <span className={styles.infoLabel}>
                  <FontAwesomeIcon icon={faFileSignature} className={styles.font}/>
                  Title:
                </span>
                            </Col>
                            <Col md={10}>
                                <Form.Control placeholder="Title"
                                              className={styles.TextArea}/>
                            </Col>
                        </Row>
                        {createDateInfoRow("Start Date", datePicker_start)}
                        {createDateInfoRow("Due Date", datePicker_due)}
                    </Container>

          <hr/>

                    <Row className={styles.Row}
                         style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {/* Exercise Type */}
                        <Col className={styles.Col} xs={8}>
              <span className={styles.infoLabel}>
                <FontAwesomeIcon icon={faBars} className={styles.font}/>
                Exercise Type:
              </span>
                            <Select
                                isClearable
                                onChange={handleChange}
                                onInputChange={handleInputChange}
                                options={typeOptions}
                                className={styles.SelectArea_layer3}
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                  <Form.Switch
                                        id={`groupIndividualPickerSwitch`}
                                        label={showPicker ? "Individual Submission" : "Group Submission"}
                                        onClick={() => setShowPicker(!showPicker)}
                                        defaultChecked={showPicker}
                                    />
                                </Col>
                                {/*<Col className={styles.Col} style={{paddingRight: 0}}>*/}
                                {/*    <FontAwesomeIcon icon={faUser} className={styles.font}/>*/}
                                {/*    <Form.Check onChange={isGroupAction} checked={!isGrouped} label={"Individual"}/>*/}
                                {/*</Col>*/}
                                {/*<Col className={styles.Col}>*/}
                                {/*    <FontAwesomeIcon icon={faUsers} className={styles.font}/>*/}
                                {/*    <Form.Check onChange={isGroupAction} checked={isGrouped} label={"Group"}/>*/}
                                {/*</Col>*/}
                            </Row>
                        </Col>
                    </Row>

          <hr/>

          <Row className={styles.Row}>
            <Col className={styles.Col}>
              <span className={styles.infoLabel}>
                Provision of answers:
              </span>
              <Col>
                <Form.Switch onChange={provOnlineAnswerSwitchAction}
                             id={"provOnlineAnswerSwitch"}
                             checked={provOnlineAnswerSwitch}
                             className={styles.Switch}
                />
              </Col>
            </Col>

            <Col className={styles.Col}>
              <span className={styles.infoLabel}>
                Visible after:
              </span>
              <Form.Control
                type="number"
                disabled={!provOnlineAnswerSwitch}
                min={0}
                max={5}
                defaultValue={2}
                className={styles.TextArea}/>
                weeks
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
                          <FontAwesomeIcon icon={faFileUpload}/>
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
                  </Card>
                )
            )}
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={styles.buttonUpload}
            style={{marginBottom: "0rem"}}
            type="submit"
            disabled={!(canUploadFile)}
            variant="secondary">
            Upload
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateModal
