import React, { useEffect, useState } from "react"
import Dandruff from "components/headings/Dandruff"
import styles from "./style.module.scss"
import classNames from "classnames"
import {
	faGlobe,
	faLink,
	faUserFriends,
} from "@fortawesome/free-solid-svg-icons"
import PageButtonGroup from "components/groups/PageButtonGroup"
import queryString from "query-string"

import { request } from "utils/api"
import { api, methods } from "constants/routes"

import TutorCardGroup from "components/groups/TutorCardGroup"
import { modulesList } from "../../ModuleList/list"

interface Props {
	year: string
	moduleID: string
}

const ModuleDashboard: React.FC<Props> = ({ year, moduleID }) => {
	let [buttons, setButtons] = useState<any>([])

	useEffect(() => {
		let moduleCode = moduleID.startsWith("CO") ? moduleID.slice(2) : moduleID
		const onSuccess = (data: { [k: string]: any }) => {
			let piazzaLink = "https://piazza.com/class/"
			if (piazzaClasses[moduleID] !== undefined && piazzaClasses[moduleID]) {
				piazzaLink += piazzaClasses[moduleID]
			}

			let newButtons: any[] = [
				{
					title: "College Website",
					icon: faGlobe,
					url: `https://www.imperial.ac.uk/computing/current-students/courses/${moduleCode}/`,
				},
				{
					title: "Piazza",
					icon: faUserFriends,
					url: piazzaLink,
				},
			]

			for (const key in data) {
				let resource = data[key]
				let resourceURL = queryString.parseUrl(resource.path)

				if (
					resource.type === "link" &&
					resourceURL.url !==
						"https://imperial.cloud.panopto.eu/Panopto/Pages/Viewer.aspx"
				) {
					newButtons.push({
						title: resource.title,
						icon: faLink,
						url: resource.path,
					})
				}
			}
			setButtons(newButtons)
		}
		request({
			url: api.MATERIALS_RESOURCES,
			method: methods.GET,
			onSuccess,
			onError: () => {
				console.log("fail")
			},
			body: {
				year: year,
				course: moduleCode,
			},
		})
	}, [moduleID, year])

	return (
		<>
			<Dandruff
				heading={
					modulesList.find(({ code }) => code === moduleID)?.title || moduleID
				}
			/>

			<h4 className={classNames(styles.moduleSectionHeader)}>Module Aims</h4>
			<div
				className={styles.moduleDashboardText}
				style={{ paddingTop: "0.75rem" }}>
				<span>In this module you will have the opportunity to:</span>
				<ul>
					<li>
						Learn about language and semantics of propositional and first-order
						logic
					</li>
					<li>
						Explore the user of logic for modelling rigorously human reasoning
					</li>
					<li>
						Apply various semantic methods for proving validity of arguments and
						logical equivalences
					</li>
					<li>
						Study natural deduction and resolution for constructing correct
						proofs
					</li>
					<li>Investigate soundness and completeness of natural deduction</li>
					<li>Apply first-order logic to program specification</li>
				</ul>
			</div>

			<h4 className={classNames(styles.moduleSectionHeader)}>Links</h4>
			<PageButtonGroup buttons={buttons} style={{ marginTop: "1.25rem" }} />
			{/*
        <div className={classNames(styles.moduleSectionHeader)}>
          <TutorCardGroup title="Module Leaders" tutors={leaders} />
        </div>
      */}
		</>
	)
}

export default ModuleDashboard

const leaders: {
	name: string
	email: string
	address: string
	image: string
}[] = [
	{
		name: "Dr. Zahid Barr",
		email: "zahid.barr@imperial.ac.uk",
		address: "373, Huxley Building",
		image: "/images/tutors/tutor-1.png",
	},
	{
		name: "Dr. Rosalind Baker",
		email: "rosalind.baker@imperial.ac.uk",
		address: "590, Huxley Building",
		image: "/images/tutors/tutor-2.png",
	},
]

const piazzaClasses: {
	[index: string]: string
} = {
	CO140: "k0r3c04qwhj3e",
	CO142: "k0r3c156mj35b",
	CO112: "k0r3by316kp6",
	CO145: "k0r3c1h4zik5y",
	"CO120.2": "k0r3bzfpcno23",
	CO150: "k0r3c1t4x8k6l",
	CO113: "k0r3byq0f68t",
	CO141: "k0r3c0t7dak4o",
	CO130: "k0r3bzsith2r",
}
