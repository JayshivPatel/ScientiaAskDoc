import React from "react"
import Card from "react-bootstrap/Card"
import styles from "./style.module.scss"
import classNames from "classnames"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import { faSeedling, faSun, faCandyCane, faEgg, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons"
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Module, ProgressStatus, Term } from "constants/types"
import { theme } from "../../../utils/functions"
import { thumbnails } from "../../../constants/thumbnails"

export interface ModuleCardProps {
  module: Module
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }: ModuleCardProps) => {
  let textColor: string = ""
  let moduleCode = module.code.startsWith("CO")
    ? module.code.slice(2)
    : module.code
  moduleCode = moduleCode.split(".").join("-")
  let thumbnail = `/images/${theme()}/module/${
    thumbnails[moduleCode] || "default.png"
  }`

  switch (module.progressStatus) {
    case ProgressStatus.NOT_STARTED:
      textColor = "#ACB5BD"
      break
    case ProgressStatus.IN_PROGRESS:
      textColor = "#29A745"
      break
    case ProgressStatus.COMPLETED:
      textColor = "#000"
  }

  return (
    <Col
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={3}
      style={{
        marginTop: "1.875rem",
        paddingLeft: "0.625rem",
        paddingRight: "0.625rem",
      }}>
      <Card
        border={!module.hasMaterials ? "danger" : ""}
        className={classNames(styles.moduleCard)}
        as={Link}
        to={`modules/${module.code}`}>
        <Card.Header>
          <div className={styles.termIcons}>
            {module.terms.map((term: Term) => {
              switch (term) {
                case "Autumn":
                  return <FontAwesomeIcon icon={faCanadianMapleLeaf} key={"Autumn"} />
                case "Spring":
                  return <FontAwesomeIcon icon={faSeedling} key={"Spring"} />
                case "Summer":
                  return <FontAwesomeIcon icon={faSun} key={"Summer"} />
                case "Christmas":
                  return <FontAwesomeIcon icon={faCandyCane} key={"Christmas"} />
                case "Easter":
                  return <FontAwesomeIcon icon={faEgg} key={"Easter"} />
                case "Jun-Sept":
                  return <FontAwesomeIcon icon={faUmbrellaBeach} key={"Jun-Sept"} />
                default:
                  return ""
              }
            })}
          </div>
          <span>{module.code}</span>
        </Card.Header>
        <Card.Img style={{ borderRadius: 0 }} variant="top" src={thumbnail} />
        <Card.Body>
          <Card.Title>{module.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          {/*
            <span
              style={{ color: textColor }}
              className={styles.moduleCardProgressText}
            >
              {module.progressStatus}
            </span>
            <span
              style={{ color: textColor }}
              className={styles.moduleCardProgressText}
            >{`${module.progressPercent}%`}</span>
          */}
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default ModuleCard
