import React, { useEffect, useState } from "react"
import Dandruff from "components/headings/Dandruff"
import styles from "./style.module.scss"
import classNames from "classnames"
import { faGlobe, faUserFriends } from "@fortawesome/free-solid-svg-icons"
import PageButtonGroup from "components/groups/PageButtonGroup"

import { request } from "utils/api"
import { api, methods } from "constants/routes"
import { modulesList } from "../../ModuleList/list"
import { teachingAims } from "../../ModuleList/aims"

interface Props {
	year: string
	moduleID: string
}

const MODULE_AIMS_PLACEHOLDER = (
	<p>
		No description of the module aims could be found at this time for this
		module.
	</p>
)

// ------------ NO WAY TO GET THIS TO WORK WITH CORS UNFORTUNATELY :(
// ------------ KEEPING IT HERE FOR FUTURE REFERENCE
// ---- THIS BELOW WOULD STAY IN THE COMPONENT
// let [moduleAims, setModuleAims] = useState<any>([])
// useEffect(() => {
// 	fetch(imperialWebsiteModuleURL, {mode: 'no-cors'})
// 		.then(response => response.ok ? response.text() : "")
// 		.then(htmlString => setModuleAims(parseModuleAimsFromHTMLString(htmlString)))
// 		.catch(_ => setModuleAims([MODULE_AIMS_PLACEHOLDER]))
// }, [year, moduleCode])
// function parseModuleAimsFromHTMLString(htmlString: string) {
// 	let htmlContent: Document = new DOMParser().parseFromString(htmlString, "text/html")
// 	console.log(htmlString)
// 	let rootElement = htmlContent.getElementById("dss-mainview")
// 	if (rootElement !== null) {
// 		const [_, firstHeader, ...rest] = rootElement.children
// 		if (firstHeader.tagName === "H3" && firstHeader.innerHTML === "Module Aims") {
// 			const firstElemAfterModuleAims = rest.find(e => e.tagName === "H3")
// 			return rest.slice(0, rest.indexOf(firstElemAfterModuleAims || rest[rest.length - 1]))
// 		}
// 		return [MODULE_AIMS_PLACEHOLDER]
// 	}
// }

const ModuleDashboard: React.FC<Props> = ({ year, moduleID }) => {
	const moduleCode = moduleID.startsWith("CO") ? moduleID.slice(2) : moduleID

	let [buttons, setButtons] = useState<any>([])
	useEffect(() => {
		const onSuccess = (data: { [k: string]: any }) => {
			const newButtons: any[] = [
				{
					title: "Syllabus",
					icon: faGlobe,
					url: `https://www.imperial.ac.uk/computing/current-students/courses/${moduleCode}/`,
				},
				{
					title: "Piazza",
					icon: faUserFriends,
					url: `https://piazza.com/imperial.ac.uk/fall2021/comp${moduleID}`,
				},
			]
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
				{teachingAims[moduleCode] || MODULE_AIMS_PLACEHOLDER}
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
