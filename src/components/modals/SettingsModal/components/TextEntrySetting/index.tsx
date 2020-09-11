import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "./style.module.scss";

interface Props {
	heading: string;
	value: any;
	setValue: Function;
	confirmValue?: Function;
}

const TextEntrySetting: React.FC<Props> = ({
	heading,
	value,
	setValue,
	confirmValue,
}) => {

  return (
    <Form.Group as={Row}>
      <Form.Label column xs="8" sm="9" md="10">
        {heading}
      </Form.Label>
      <Col xs="4" sm="3" md="2">
        <Form.Control
          className={styles.inputBar}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={confirmValue ?(e: any) => confirmValue(e.target.value) : () => {}}
        />
      </Col>
    </Form.Group>
  );
};

export default TextEntrySetting;
