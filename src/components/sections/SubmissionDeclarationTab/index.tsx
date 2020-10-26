import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import classNames from "classnames";

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
  UNAIDED = "Unaided",
  WITH_HELP = "With help",
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
      setDeclarationStatus(DeclarationStatus.UNAIDED)
    } else {
      setDeclarationStatus(DeclarationStatus.WITH_HELP)
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

  const unaidedSelectText = "Click to declare that the submission is unaided."
  const unaidedDeclarationText = "We declare that this final submitted version is our unaided work."
  const withHelpSelectText = "Click to acknowledge other people for helping through your original discussions."
  const withHelpDeclarationText = "We acknowledge the following people for help through our original discussions:"

  const [unaidedClass, withHelpClass] = {
    [DeclarationStatus.NOTSET]: ["", ""],
    [DeclarationStatus.UNAIDED]: [styles.active, styles.collapsed],
    [DeclarationStatus.WITH_HELP]: [styles.collapsed, styles.active],
  }[declarationStatus]

  console.log(unaidedClass, withHelpClass)

  const unaided: JSX.Element = (
    <div 
      className={classNames(styles.unaidedPanel, unaidedClass, styles.center)}
      onClick={() => {
        submitForm()
        setDeclarationStatus(DeclarationStatus.UNAIDED)
      }}
    >
      <div className={styles.center}>
        <p className={styles.submitDeclParagraphBold}>
          {declarationStatus === DeclarationStatus.NOTSET ? unaidedSelectText : unaidedDeclarationText}
        </p>
      </div>
    </div>
  )

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

  const withHelp: JSX.Element = (
    <div 
      className={classNames(styles.withHelpPanel, withHelpClass)}
      style={{ height: 'auto' }}
      onClick={() => setDeclarationStatus(DeclarationStatus.WITH_HELP)}
    >
      <div className={declarationStatus === DeclarationStatus.NOTSET ? styles.center : ""}>
        <span className={styles.submitDeclParagraphBold}>
          {declarationStatus === DeclarationStatus.NOTSET ? withHelpSelectText : withHelpDeclarationText}
        </span>
        {DeclarationRow}
        {(declarationStatus === DeclarationStatus.WITH_HELP) && <>
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
        </>
        }

      </div>
    </div>
  )

  return (
    <Form>
      <Form.Group>
        <div style={{ display: 'flex' }}>
          {declarationStatus !== DeclarationStatus.WITH_HELP && unaided}
          {declarationStatus !== DeclarationStatus.UNAIDED && withHelp}
        </div>
        {declarationStatus === DeclarationStatus.WITH_HELP && (
          <Form.Text muted className={styles.submitDeclHelpText}>
            Names must contain only alphabetic characters [A-Za-z],
            spaces and hyphens (-); logins must contain only lower case
            letters and/or digits [a-z0-9]. Name-login pairs with incorrect
            syntax will be ignored.
          </Form.Text>)
        }
        {declarationStatus !== DeclarationStatus.NOTSET && (
          <Form.Row className={styles.submitDeclRow}>
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
        )}
      </Form.Group>
    </Form>
  )
}

export default SubmitDeclarationSection