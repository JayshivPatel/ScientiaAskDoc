import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "../SubmissionSection/style.module.scss";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface Declaration {
  name: string
  login: string
}

interface Props {

}

enum DeclarationStatus {
  NOTSET = "NotSet",
  EMPTY = "Empty",
  FILLED = "Filled",
}

const SubmitDeclarationSection: React.FC<Props> = ({}) => {

  const [declarationSubmitted, setDeclarationSubmitted] = useState<boolean>(false);
  const [declarationStatus, setDeclarationStatus] = useState<DeclarationStatus>(DeclarationStatus.NOTSET)
  const [name, setName] = useState<string>("")
  const [login, setLogin] = useState<string>("")
  const [declarationList, setDeclarationList] = useState<Declaration[]>([])

  const switchDeclarationStatus = ((): () => void => {
    if (declarationSubmitted) {
      return () => setDeclarationSubmitted(false)
    } else {
      return () => setDeclarationSubmitted(true)
    }
  })()

  const addRow = (name: string, login: string) => {
    setDeclarationList([...declarationList, {name, login}])
  }

  const deleteRow = (index: number) => {
    setDeclarationList(declarationList.filter((val, idx) => index !== idx))
  }

  const resetForm = () => {
    setDeclarationList([])
    setName("")
    setLogin("")
  }

  const submitForm = () => {
    if (declarationList.length === 0) {
      setDeclarationStatus(DeclarationStatus.EMPTY)
    } else {
      setDeclarationStatus(DeclarationStatus.FILLED)
    }
  }

  let displayText: string
  if (declarationSubmitted) {
    displayText = "Re-submit Declaration"
  } else {
    displayText = "Submit Declaration"
  }

  const DeclarationStatement: JSX.Element = (declarationStatus === DeclarationStatus.EMPTY) ?
    (<p className={styles.submitDeclParagraph}>We declare that this final submitted version is our unaided work.</p>) :
    ((declarationStatus === DeclarationStatus.FILLED) ?
      <p className={styles.submitDeclParagraph}>We acknowledge the following people for help through our original discussions:</p> :
      <p className={styles.submitDeclParagraph}>Fill in these boxes if the following people provide help through you original discussions:</p>)

  const DeclarationRow: JSX.Element =
    <>
      {declarationList.map(
        (val, idx) => {
          return (
            <Form.Row>
              <Col>
                <Form.Control plaintext readOnly defaultValue={val.name} />
              </Col>
              <Col>
                <Form.Control plaintext readOnly defaultValue={val.login.toString()} />
              </Col>
              <Col>
                <Button
                  onClick={() => deleteRow(idx)}>
                  Delete
                </Button>
              </Col>
            </Form.Row>
          )
        }
      )}
    </>

  return (
    <Form>
      <Form.Group>
        {DeclarationStatement}
        {DeclarationRow}
        <Form.Row>
          <Col>
            <Form.Label className={styles.submitDeclTitle}>Name</Form.Label>
            <Form.Control placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
          </Col>
          <Col>
            <Form.Label className={styles.submitDeclTitle}>Login (if member of DOC)</Form.Label>
            <Form.Control placeholder="Login" value={login} onChange={(event) => setLogin(event.target.value)}/>
          </Col>
          <Col>
            <Button
              onClick={() => addRow(name, login)}>
              Add
            </Button>
          </Col>
        </Form.Row>
        <Form.Text>
          Names must contain only alphabetic characters [A-Za-z],
          spaces and hyphens (-); logins must contain only lower case
          letters and/or digits [a-z0-9]. Name-login pairs with incorrect
          syntax will be ignored.
        </Form.Text>
        <Form.Row>
          <Col>
            <Button
              variant="secondary"
              className={styles.submitDeclButton}
              onClick={() => {
                submitForm()
                switchDeclarationStatus()
              }}
            >
              {displayText}
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className={styles.submitDeclButton}
              onClick={resetForm}
            >
              Reset Form
            </Button>
          </Col>
        </Form.Row>
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
            <Form.Text>
              Only possible when no submission record exists
              (neither hardcopy nor electronic).
            </Form.Text>
          </Col>
        </Form.Row>
      </Form.Group>
    </Form>
  )
}

export default SubmitDeclarationSection