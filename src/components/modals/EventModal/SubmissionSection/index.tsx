import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import styles from "./style.module.scss"
import {EnumDictionary, ResourceUploadRequirement, ResourceUploadStatus, TimelineEvent} from "constants/types"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import SubmissionFileUpload from "./SubmissionFileUpload"

enum Stage {
  DECLARATION = "Declaration",
  GROUP_FORMATION = "Group Formation",
  FILE_UPLOAD = "File Upload",
}

const allStages: Stage[] = [
  Stage.DECLARATION,
  Stage.GROUP_FORMATION,
  Stage.FILE_UPLOAD
]

interface SubmitDeclarationProps {

}

const SubmitDeclarationSection: React.FC<SubmitDeclarationProps> = ({}) => {

  return (
    <Form>
      <Form.Group
        className={styles.submitDeclParagraph}
      >
        <Form.Label>
          We declare that this final submitted version is our unaided work.
        </Form.Label>
        <Form.Label>
          We acknowledge the following people for help through our original discussions:
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label className={styles.submitDeclTitle}>Name</Form.Label>
            <Form.Control placeholder="Name"/>
            <Form.Control placeholder="Name"/>
            <Form.Control placeholder="Name"/>
            <Form.Control placeholder="Name"/>
            <Form.Control placeholder="Name"/>
          </Col>
          <Col>
            <Form.Label className={styles.submitDeclTitle}>Login (if member of DOC)</Form.Label>
            <Form.Control placeholder="Login"/>
            <Form.Control placeholder="Login"/>
            <Form.Control placeholder="Login"/>
            <Form.Control placeholder="Login"/>
            <Form.Control placeholder="Login"/>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button
              variant="secondary"
              className={styles.submitDeclButton}
            >
              Change Declaration
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className={styles.submitDeclButton}
            >
              Reset Form
            </Button>
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group
        className={styles.submitDeclParagraph}
      >
        <p>
          Fill in or modify these boxes as appropriate.
        </p>
        <p>
          Names must contain only alphabetic characters [A-Za-z],
          spaces and hyphens (-); logins must contain only lower case
          letters and/or digits [a-z0-9]. Name-login pairs with incorrect
          syntax will be ignored.
        </p>
      </Form.Group>
      <Form.Group>
        <Form.Row>
          <Col>
            <Button
              variant="secondary"
              className={styles.submitDeclButton}
            >
              Delete Declaration
            </Button>
          </Col>
          <Col>
            <p>
              Only possible when no submission record exists
              (neither hardcopy nor electronic).
            </p>
          </Col>
        </Form.Row>
      </Form.Group>
    </Form>
  )
}

interface Props {
  event?: TimelineEvent
  activeDay: Date
}

const SubmissionSection: React.FC<Props> = ({
                                              event,
                                              activeDay,
                                            }) => {

  const [stage, setStage] = useState(Stage.DECLARATION)
  const [requirements, setRequirements] = useState<ResourceUploadRequirement[]>(dummyRUR)
  const [uploaded, setUploaded] = useState<ResourceUploadStatus[]>([])

  const uploadFile = (file: File, index: number) => {
    const requirement = requirements[index]
    const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
    console.log(suffix);

    if (requirement.allowedSuffixes.includes(suffix)) {
      const title = requirement.title
      const newFile = new File([file], `${title}${suffix === "" ? "" : `.${suffix}`}`, { type: file.type })
      const newStatus: ResourceUploadStatus = {
        file: newFile,
        title: title,
        suffix: suffix,
        timestamp: new Date(),
        oldRequirement: requirement
      }
      console.log(newFile);
      setRequirements(requirements.filter((_, i) => i !== index))
      setUploaded([...uploaded, newStatus])
    } else {
      alert("u kidding?")
    }
  }

  const removeFile = (index: number) => {
    const status = uploaded[index]
    setRequirements([...requirements, status.oldRequirement])
    setUploaded(uploaded.filter((_, i) => i !== index))
  }

  const mainSectionDic: EnumDictionary<Stage, JSX.Element> = {
    [Stage.DECLARATION]: <SubmitDeclarationSection/>,
    [Stage.GROUP_FORMATION]: <></>,
    [Stage.FILE_UPLOAD]: (
      <SubmissionFileUpload
        requiredResources={requirements}
        uploadedResources={uploaded}
        uploadFile={uploadFile}
      />
    ),
  }

  const buttonOf = (s: Stage) => {
    return (
      <Button
        className={styles.sectionButton}
        onClick={() => setStage(s)}
        active={s === stage}
      >
        {s}
      </Button>
    )
  }

  return (
    <>
      <div className={styles.sectionSwitcher}>
        <ButtonGroup>
          {allStages.map(buttonOf)}
        </ButtonGroup>
      </div>
      {mainSectionDic[stage]}
    </>
  )
}

const dummyRUR: ResourceUploadRequirement[] = [
  {
    title: "foo",
    allowedSuffixes: ["pdf"]
  },
  {
    title: "report",
    allowedSuffixes: ["pdf", "txt", "pptx", "ppt"]
  },
  {
    title: "HaskellCoursework",
    allowedSuffixes: ["hs", "lhs"]
  },
  {
    title: "allow_empty_suffix",
    allowedSuffixes: ["", "txt"]
  },
]

export default SubmissionSection
