import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./style.module.scss";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

interface Props {
  heading: string;
  onClick: (value: any, e?: any) => void;
  value: any;
  buttons: {
    value: any;
    text: string;
  }[];
}

const ButtonGroupSetting: React.FC<Props> = ({
  heading,
  value,
  buttons,
  onClick,
}) => {
  return (
    <Form.Group style={{ alignItems: "center" }}>
      <Form.Label>{heading}</Form.Label>
      <ButtonGroup style={{ float: "right" }}>
        {buttons.map((button) => (
          <Button
            className={styles.modalToggleButton}
            active={value === button.value}
            onClick={(e) => onClick(button.value, e)}
            key={button.value}
            variant="secondary"
          >
            {button.text}
          </Button>
        ))}
      </ButtonGroup>
    </Form.Group>
  );
};

export default ButtonGroupSetting;
