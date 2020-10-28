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

interface Props {
  status: DeclarationStatus
  declaredHelpers: DeclarationHelper[]
  onSetUnaided: () => void
  onSetWithHelp: () => void
  addHelper: (name: string, login: string) => void 
  removeHelper: (name: string, login: string) => void
}

const SubmitDeclarationSection: React.FC<Props> = ({
  status,
  declaredHelpers,
  onSetUnaided,
  onSetWithHelp,
  addHelper,
  removeHelper,
}) => {

  const [name, setName] = useState<string>("")
  const [login, setLogin] = useState<string>("")

  const isUnaided = status === DeclarationStatus.UNAIDED

  const addRow = (name: string, login: string) => {
    if (name !== "" && !declaredHelpers.find(({ name: n, login: l }) => n === name && login === l)) {
      addHelper(name, login)
    }
    setName("")
    setLogin("")
  }

  const submitForm = () => {
    setName("")
    setLogin("")
  }

  const unaidedSelectText = "Click to declare that the submission is unaided."
  const unaidedDeclarationText = "We declare that this final submitted version is our unaided work."
  const withHelpSelectText = "Click to acknowledge other people for helping through your original discussions."
  const withHelpDeclarationText = "We acknowledge the following people for help through our original discussions:"


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

  return (
    <Form>
      <div 
        className={classNames(styles.declarationPanel, isUnaided ? styles.tealPanel : undefined)}
      >
        <Form.Check 
          type='checkbox' 
          id='declaration-check' 
          label={isUnaided ? unaidedDeclarationText : withHelpDeclarationText}
          checked={isUnaided}
          onChange={() => {
            if (isUnaided) {
              onSetWithHelp()
            } else {
              onSetUnaided()
            }
          }}
        />
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
        </>} 
      </div>
    </Form>
  )
}

export default SubmitDeclarationSection