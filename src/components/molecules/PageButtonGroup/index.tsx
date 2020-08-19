import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ButtonGroupProps {
  buttons: {
    title: string;
    icon: IconDefinition;
    url: string;
  }[];
}

const PageButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
}: ButtonGroupProps) => {
  return (
    <>
      <Row style={{ marginTop: "45px" }}>
        {buttons.map(({ title, icon, url }, i) => (
          <Col
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            key={i}
            style={{ paddingRight: "10px", paddingLeft: "10px" }}
          >
            <Button href={url} target="_blank">
              {title}
              <FontAwesomeIcon style={{ fontSize: "1.125rem" }} icon={icon} />
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PageButtonGroup;
