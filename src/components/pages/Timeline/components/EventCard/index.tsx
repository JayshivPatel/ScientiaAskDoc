import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export interface TimelineEventProps {
  title: string;
  prefix: string;
  assessment: string;
  status: string;
  startColumn: number;
  endColumn: number;
  rowNumber: number;
  onClick: (event: React.MouseEvent) => void;
}

const EventCard: React.FC<TimelineEventProps> = ({
  title,
  prefix,
  assessment,
  status,
  startColumn,
  endColumn,
  rowNumber,
  onClick,
}) => {
  let icon = undefined;
  let cardColour = "blue";
  let borderColour = "";
  let isSingleDay = endColumn - startColumn < 2;
  switch (assessment) {
    case "unassessed submission":
      cardColour = "blue";
      break;
    case "individual assessed":
      cardColour = "teal";
      break;
    case "group assessed":
      cardColour = "pink";
      break;
    case "unassessed":
      cardColour = "cyan";
      break;
    case "written exam":
      cardColour = "indigo";
      break;
  }

  switch (status) {
    case "due":
      borderColour = "text";
      break;
    case "unreleased":
      borderColour = "background";
      break;
    case "late":
      borderColour = "text";
      icon = faBullhorn;
      break;
    case "missed":
      borderColour = "background";
      icon = faExclamationCircle;
      break;
    case "complete":
      borderColour = "background";
      icon = faCheckCircle;
      break;
  }
  let marginX = isSingleDay ? (icon ? ".4rem" : ".1rem") : ".5rem";
  let paddingX = isSingleDay ? (icon ? ".5rem" : ".3rem") : ".5rem";
  return (
    <div
      className={classNames(styles.timelineEvent)}
      onClick={onClick}
      style={{
        gridColumn: `${startColumn} / ${endColumn}`,
        gridRow: `${rowNumber}`,
        marginLeft: marginX,
        marginRight: marginX,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        backgroundColor: `var(--${cardColour}-background)`,
        color: `var(--${cardColour}-text)`,
        borderColor: `var(--${cardColour}-${borderColour})`,
      }}
    >
      {(!isSingleDay || !icon) && (
        <span
          className={styles.eventTitle}
          style={{
            fontSize: isSingleDay ? "0rem" : "1rem",
            width: icon ? "90%" : "100%",
          }}
        >
          <span
            className={styles.eventPrefix}
            style={{
              fontSize: isSingleDay ? "0.9rem" : "1rem",
            }}
          >
            {prefix}&nbsp;
          </span>
          {title}
        </span>
      )}
      {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
    </div>
  );
};

export default EventCard;
