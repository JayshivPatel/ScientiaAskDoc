import React from "react";
import Form from "react-bootstrap/Form";
import styles from "../SubmissionSection/style.module.scss";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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