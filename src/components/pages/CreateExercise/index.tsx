import React, {useCallback, useState} from "react"
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faFolder, faFolderOpen, faTimes, faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import styles from "../../modals/UploadModal/style.module.scss";
import Tab from "react-bootstrap/Tab";
import classNames from "classnames";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ResourceDetailForm from "../../sections/ResourceDetailForm";
import Tabs from "react-bootstrap/Tabs";
import {useDropzone} from "react-dropzone";




interface Props {
  studentID: string,
  courseID: string,
  exerciseID: number,
}

const Excercise: React.FC<Props> = ({
                                    studentID,
                                    courseID,
                                    exerciseID,
                                  }) => {

  const [tab, setTab] = useState("file")
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([])
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

  const removeFile = (file: File) => {
    const newFiles = [...rejectedFiles, file]
    setRejectedFiles(newFiles)
  }

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

  return (
    <>
      <div>Submission Page Goes Here!</div>

      <Tabs
        className={styles.tabContainer}
        style={{marginTop: "1.25rem"}}
        activeKey={tab}
        onSelect={(tab) => setTab(tab ? tab : "file")}>
        <Tab eventKey="file" title="File to submit">
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

                    {/*<Accordion.Collapse eventKey={`${index}`} className={styles.collapse}>*/}
                    {/*  <Card.Body>*/}
                    {/*    <ResourceDetailForm*/}
                    {/*      id={index}*/}
                    {/*      key={index}*/}
                    {/*      categories={categories}*/}
                    {/*      tagList={tags}*/}
                    {/*      isLink={false}*/}
                    {/*      defaultTitle={file.name}*/}
                    {/*      handleInvalidDetails={setCanUploadFile}*/}
                    {/*      titleDuplicated={titleDuplicated}*/}
                    {/*      setResourceDetails={updateResourceDetails(*/}
                    {/*        index*/}
                    {/*      )}*/}
                    {/*    />*/}
                    {/*  </Card.Body>*/}
                    {/*</Accordion.Collapse>*/}
                  </Card>
                )
            )}
          </Accordion>
        </Tab>
      </Tabs>


      <Row style={{marginTop: "0.625rem"}}>
        <Col style={{paddingLeft: "85%"}}>
          <Button>
            Upload
            <FontAwesomeIcon style={{float: "right", position: "relative"}} icon={faUpload}/>
          </Button>
        </Col>
      </Row>

    </>
  )
}

export default Excercise