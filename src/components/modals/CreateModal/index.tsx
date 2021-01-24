import React, {useState, useCallback} from "react"
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
  faTimes,
  faFolder,
  faFolderOpen,
  faCalendarAlt,
  faFileUpload,
  faBars, faFileSignature
} from "@fortawesome/free-solid-svg-icons"

import styles from "./style.module.scss"
import {request} from "utils/api"
import {api, methods} from "constants/routes"
import moment from "moment"
import Container from "react-bootstrap/cjs/Container";
import Select from "react-select";
import {LinkTitleError} from "../../../constants/types";

interface CreateModalProps {
  show: boolean
  onHide: any
  hideAndReload: () => void
  year: string
  course: string
  title?: string
  exerciseType?: string
  startDate: number
  dueDate: number
  isIndividual?: boolean
  suppressErrorMsg?: boolean
  setSuppressErrorMsg?: (b: boolean) => void
}


const CreateModal: React.FC<CreateModalProps> = ({
                                                   show,
                                                   onHide,
                                                   hideAndReload,
                                                   year,
                                                   title,
                                                   course,
                                                   exerciseType,
                                                   startDate,
                                                   dueDate,
                                                   isIndividual,
                                                   suppressErrorMsg,
                                                   setSuppressErrorMsg,
                                                 }) => {
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const [serverErrors, setServerErrors] = useState<{ message: string }[]>([]);


  const [titleError, setLinkTitleError] = useState<LinkTitleError>();
  const [validTitle, setValidTitle] = useState<boolean>(false);
  const [validType, setvalidType] = useState<boolean>(false);
  const [canUploadFile, setCanUploadFile] = useState<boolean>(false);

  const maxSize = 25 * (2 ** 10) * (2 ** 10); // 25mb

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

    const makePayload = () => {
      let payload: { [key: string]: any } = {
        year: year,
        course: course,
        exerciseType: exerciseType,
        title: title,
        start_date: startDate,
        due_date: dueDate,
      };
      return payload
    }

    const onError = () => {
      return (message: string) => {
        setServerErrors([
          ...serverErrors,
          {
            message: message,
          },
        ])
      }
    }


    await Promise.all(
      acceptedFiles.map(async file => {
        if (rejectedFiles.includes(file)) {
          // Empty promise i.e. do nothing
          return Promise.resolve()
        }
        return request({
          api: api.MATERIALS_RESOURCES(), // TODO: connect correct api
          method: methods.POST,
          body: makePayload(),
        })
          .then(() => submitFileForResource(file))
          .catch(() => onError())
      })
    )

    if (serverErrors.length === 0) {
      hideAndReload()
    } else {
      // TODO: Handle errors
      console.log(serverErrors)
    }

  };

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
  const [dateOptions] = React.useState(dates);

  // time options:
  const timeWholeDay = []
  for (let i = 0; i < 24; i++) {
    timeWholeDay.push({label: new Date(date.setHours(i, 0, 0, 0)).toTimeString(), value: i})
  }
  const [timeOptions] = React.useState(timeWholeDay)

  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.groupEnd();
  };

  const handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.groupEnd();
  };

  // state for individual/group cw
  const [isGrouped, setGrouped] = useState(false);
  const isGroupAction = () => {
    setGrouped(!isGrouped);
  };


  const [dateStart, setDateStart] = useState<Date>(new Date());
  const dayUnitTime = 1000 * 60 * 60 * 24;
  const [dateDue, setDateDue] = useState<Date>(new Date(dateStart.getTime() + dayUnitTime));


  const datePickerStart = (
    <DatePicker
      className={styles.datePicker}
      selected={dateStart}
      onChange={(date: Date) => {
        setDateStart(date);
        let nextDate = new Date(date.getTime() + dayUnitTime);
        setDateDue(nextDate);
      }}
      showTimeInput
      timeFormat="HH:mm"
      dateFormat="d/M/yyyy HH:mm 'UTC'"
    />
  );

  const datePickerDue = (
    <DatePicker
      className={styles.datePicker}
      selected={dateDue}
      onChange={(date: Date) => {
        setDateDue(date);
        if (date.getUTCDate() < dateStart.getUTCDate()) {
          let nextDate = new Date(dateStart.getTime() + dayUnitTime);
          setDateDue(nextDate);
          console.warn("Cannot set due date before start date!");
          window.alert("Cannot set due date before start date!")
        }
      }}
      showTimeInput
      timeFormat="HH:mm"
      dateFormat="d/M/yyyy HH:mm 'UTC'"
    />
  );

  const validateExerciseTitle = (title: string) => {
    if (title.trim() === "") {
      setLinkTitleError(LinkTitleError.EmptyTitle);
      return
    }
    setLinkTitleError(undefined)
  };

  const exerciseTitleMessage = (error: LinkTitleError | undefined) => {
    switch (error) {
      case LinkTitleError.EmptyTitle:
        return "Exercise title cannot be empty!";
      default:
        return ""
    }
  };

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
                {/*<Form.Control placeholder="Title" className={styles.TextArea}/>*/}
                <Form.Group>
                  <Form.Control
                    className={styles.TextArea}
                    type="text"
                    placeholder="Enter the Exercise Title"
                    defaultValue={""}
                    isInvalid={!suppressErrorMsg && titleError !== undefined}
                    onChange={(event) => {
                      setSuppressErrorMsg?.(false);
                      validateExerciseTitle(event.target.value);
                      title = (event.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {exerciseTitleMessage(titleError)}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {createDateInfoRow("Start Date", datePickerStart)}
            {createDateInfoRow("Due Date", datePickerDue)}
          </Container>
          <hr/>
          <Row
            className={styles.Row}
            style={{display: "flex", alignItems: "center", justifyContent: "center"}}
          >
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
                    label={isGrouped ? "Group Submission" : "Individual Submission"}
                    onClick={isGroupAction}
                    defaultChecked={isGrouped}
                  />
                </Col>
              </Row>
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
            acceptedFiles.map((file, index) =>
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
