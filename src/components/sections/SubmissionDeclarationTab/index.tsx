import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";

interface Declaration {
  name: string
  login: string
}

interface Props {
  // validatePair: (name: string, login: string) => boolean
  // addDeclarations: (declarations: Declaration[]) => void
}

enum DeclarationStatus {
  NOTSET = "NotSet",
  EMPTY = "Empty",
  FILLED = "Filled",
}

const SubmitDeclarationSection: React.FC<Props> = ({


}) => {

  const [declarationSubmitted, setDeclarationSubmitted] = useState<boolean>(false);
  const [declarationStatus, setDeclarationStatus] = useState<DeclarationStatus>(DeclarationStatus.NOTSET)
  const [name, setName] = useState<string>("")
  const [login, setLogin] = useState<string>("")
  const [declarationList, setDeclarationList] = useState<Declaration[]>([])

  const switchDeclarationStatus = () => setDeclarationSubmitted(!declarationSubmitted)

  const addRow = (name: string, login: string) => {
    setDeclarationList([...declarationList, {name, login}])
    setName("")
    setLogin("")
  }

  const deleteRow = (targetName: string, targetLogin: string) => {
    setDeclarationList(declarationList.filter(({ name, login }) => targetName !== name || targetLogin !== login))
  }

  const resetForm = () => {
    setDeclarationStatus(DeclarationStatus.NOTSET)
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
    setName("")
    setLogin("")
  }

  let displayText: string
  if (declarationSubmitted) {
    displayText = "Re-submit Declaration"
  } else {
    displayText = "Submit Declaration"
  }

  const DeclarationStatement: JSX.Element = (declarationStatus === DeclarationStatus.EMPTY) ?
    (<p className={styles.submitDeclParagraphBold}>We declare that this final submitted version is our unaided work.</p>) :
    ((declarationStatus === DeclarationStatus.FILLED) ?
      <p className={styles.submitDeclParagraphBold}>We acknowledge the following people for help through our original discussions:</p> :
      <p className={styles.submitDeclParagraph}>Fill in these boxes if the following people provide help through you original discussions:</p>)

  const DeclarationRow: JSX.Element =
    <>
      {declarationList.map(
        ({ name, login }, index) => {
          return (
            <Form.Row className={styles.submitDeclRow} key={index}>
              <Col sm="5">
                <Form.Control
                  className={styles.submitDeclControl}
                  plaintext
                  readOnly
                  value={name}
                />
              </Col>
              <Col sm="5">
                <Form.Control
                  className={styles.submitDeclControl}
                  plaintext
                  readOnly
                  value={login.toString()}
                />
              </Col>
              <Col sm="2">
                <Button
                  className={styles.submitDeclButton}
                  onClick={() => deleteRow(name, login)}
                  variant="secondary"
                >
                  <FontAwesomeIcon icon={faMinusCircle} />
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
        <Form.Row className={styles.submitDeclFirstRow}>
          <Col sm="5">
            <Form.Label className={styles.submitDeclTitle}>Name</Form.Label>
          </Col>
          <Col sm="5">
            <Form.Label className={styles.submitDeclTitle}>Login (if member of DOC)</Form.Label>
          </Col>
          <Col sm="2"/>
        </Form.Row>
        <Form.Row className={styles.submitDeclRow}>
          <Col sm="5">
            <Form.Control
              className={styles.submitDeclControl}
              placeholder="Name"
              value={name}
              onChange={
                (event) => setName(event.target.value)
              }
            />
          </Col>
          <Col sm="5">
            <Form.Control
              className={styles.submitDeclControl}
              placeholder="Login"
              value={login}
              onChange={
                (event) => setLogin(event.target.value)
              }
            />
          </Col>
          <Col sm="2">
            <Button
              className={styles.submitDeclButton}
              onClick={() => addRow(name, login)}
              variant="secondary"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
          </Col>
        </Form.Row>
        <Form.Text muted className={styles.submitDeclHelpText}>
          Names must contain only alphabetic characters [A-Za-z],
          spaces and hyphens (-); logins must contain only lower case
          letters and/or digits [a-z0-9]. Name-login pairs with incorrect
          syntax will be ignored.
        </Form.Text>
        <Form.Row className={styles.submitDeclRow}>
          <Col>
            <Button
              className={styles.submitDeclButton}
              onClick={() => {
                submitForm()
                switchDeclarationStatus()
              }}
              variant="secondary"
            >
              {displayText}
            </Button>
          </Col>
          <Col>
            <Button
              className={styles.submitDeclButton}
              onClick={resetForm}
              variant="secondary"
            >
              Reset Form
            </Button>
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Row className={styles.submitDeclRow}>
          <Button
            className={styles.submitDeclButton}
            variant="secondary"
          >
            Delete Declaration
          </Button>
        </Form.Row>
        <Form.Text muted className={styles.submitDeclHelpText}>
          Only possible when no submission record exists
          (neither hardcopy nor electronic).
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default SubmitDeclarationSection