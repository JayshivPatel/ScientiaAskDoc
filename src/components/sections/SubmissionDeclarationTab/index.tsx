import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import classNames from "classnames";
import { DeclarationHelper, DeclarationStatus } from "constants/types";
import { faCheckCircle, faEye } from "@fortawesome/free-solid-svg-icons";

interface Declaration {
  name: string
  login: string
}

interface Props {
  status: DeclarationStatus
  declaredHelpers: DeclarationHelper[]
  onUnset: () => void
  onSetUnaided: () => void
  onSetWithHelp: () => void
  addHelper: (name: string, login: string) => void 
  removeHelper: (name: string, login: string) => void
}

const SubmitDeclarationSection: React.FC<Props> = ({
  status,
  declaredHelpers,
  onUnset,
  onSetUnaided,
  onSetWithHelp,
  addHelper,
  removeHelper,
}) => {

  const declarationSubmitted = status !== DeclarationStatus.NOTSET
  const [name, setName] = useState<string>("")
  const [login, setLogin] = useState<string>("")

  const addRow = (name: string, login: string) => {
    if (name !== "" && !declaredHelpers.find(({ name: n, login: l }) => n === name && login === l)) {
      addHelper(name, login)
    }
    setName("")
    setLogin("")
  }
  const resetForm = () => {
    onUnset()
    setName("")
    setLogin("")
  }

  const submitForm = () => {
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
  }[status]

  const unaided: JSX.Element = (
    <div 
      className={classNames(styles.unaidedPanel, unaidedClass, styles.center)}
      onClick={() => {
        submitForm()
        onSetUnaided()
      }}
    >
      <div className={styles.center}>   
        <p className={styles.submitDeclParagraphBold}>
          {status === DeclarationStatus.UNAIDED && <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '0.3rem' }}/> }
          {status === DeclarationStatus.NOTSET ? unaidedSelectText : unaidedDeclarationText}
        </p>
      </div>
    </div>
  )

  const DeclarationRow: JSX.Element =
    <>
      {declaredHelpers.map(
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
                  onClick={() => removeHelper(name, login)}
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
      onClick={() => {
        if (status !== DeclarationStatus.WITH_HELP) {
          onSetWithHelp()
        }
      }}
    >
      <div className={status === DeclarationStatus.NOTSET ? styles.center : ""}>
        <span className={styles.submitDeclParagraphBold}>
          {status === DeclarationStatus.NOTSET || <FontAwesomeIcon icon={faEye} style={{ marginRight: '0.3rem' }}/>}
          {status === DeclarationStatus.NOTSET ? withHelpSelectText : withHelpDeclarationText}
        </span>
        {(status === DeclarationStatus.WITH_HELP) && <>
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
        </>
        }

      </div>
    </div>
  )

  return (
    <Form>
      <Form.Group>
        <div style={{ display: 'flex' }}>
          {status !== DeclarationStatus.WITH_HELP && unaided}
          {status !== DeclarationStatus.UNAIDED && withHelp}
        </div>
        {status === DeclarationStatus.WITH_HELP && (
          <Form.Text muted className={styles.submitDeclHelpText}>
            Names must contain only alphabetic characters [A-Za-z],
            spaces and hyphens (-); logins must contain only lower case
            letters and/or digits [a-z0-9]. Name-login pairs with incorrect
            syntax will be ignored.
          </Form.Text>)
        }
        {status !== DeclarationStatus.NOTSET && (
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