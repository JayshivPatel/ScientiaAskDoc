import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import classNames from "classnames";
import { Paragraph } from "./paragraph";

export interface Props {
  important?: boolean;
  ok?: boolean;
  paragraph: Paragraph;
  timestamp: Date;
  image:
    | { kind: "icon"; icon: IconDefinition }
    | { kind: "img"; image: string };
  onClick: (e: React.MouseEvent) => void;
}

const InsightCard: React.FC<Props> = ({
  important,
  ok,
  paragraph,
  timestamp,
  image,
  onClick,
}) => {
  const classOf = (...baseClasses: string[]) =>
    classNames(
      ...baseClasses,
      important ? styles.important : undefined,
      ok ? styles.ok : undefined
    );
  const imageDisplay = (() => {
    switch (image.kind) {
      case "icon":
        return (
          <FontAwesomeIcon
            className={classOf(styles.insightIcon)}
            icon={image.icon}
            size={"3x"}
          />
        );
      case "img":
        return <Image className={styles.insightImage} src={image.image} />;
    }
  })();

  const paragraphDisplay = (
    <p>
      {paragraph.map(({ text, style }, idx) => {
        switch (style) {
          case "bold":
            return (
              <b key={idx} className={classOf(styles.insightBoldText)}>
                {text}
              </b>
            );
          default:
            return text;
        }
      })}
    </p>
  );

  return (
    <>
      <Container className={classOf(styles.insightContainer)} onClick={onClick}>
        {imageDisplay}
        <div>
          {paragraphDisplay}
          <p className={classOf(styles.insightAddress)}>
            {moment(timestamp).fromNow()}
          </p>
        </div>
      </Container>
    </>
  );
};

export default InsightCard;
