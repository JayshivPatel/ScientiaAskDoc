import React, { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import styles from "./style.module.scss"
import classNames from "classnames"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import { faSun, faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Term, ProgressStatus, Module } from "constants/types"
import { theme } from "../../../utils/functions"

export interface ModuleCardProps {
	module: Module
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }: ModuleCardProps) => {
	let [thumbnail, setThumbnail] = useState(
		`/images/${theme()}/module/default.png`
	)
	useEffect(() => {
		const urlAttempt = `/images/${theme()}/module/${moduleCode}.png`
		fetch(urlAttempt, { method: "HEAD" })
			.then((res) => {
				if (res.ok) setThumbnail(urlAttempt)
			})
			.catch((err) => console.log(err))
	}, [])

	let textColor: string = ""
	let moduleCode = module.code.startsWith("CO")
		? module.code.slice(2)
		: module.code
	moduleCode = moduleCode.split(".").join("-")

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
				className={classNames(styles.moduleCard)}
				as={Link}
				to={`modules/${module.code}`}>
				<Card.Header>
					<div className={styles.termIcons}>
						{module.terms.map((term: Term) => {
							switch (term) {
								case "Autumn":
									return <FontAwesomeIcon icon={faLeaf} key={"Autumn"} />
								case "Spring":
									return <FontAwesomeIcon icon={faSeedling} key={"Spring"} />
								case "Summer":
									return <FontAwesomeIcon icon={faSun} key={"Summer"} />
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
