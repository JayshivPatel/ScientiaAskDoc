import React, { useEffect, useState } from "react"
import Dandruff from "components/headings/Dandruff"
import styles from "./style.module.scss"
import classNames from "classnames"
import { faGlobe, faUserFriends } from "@fortawesome/free-solid-svg-icons"
import PageButtonGroup from "components/groups/PageButtonGroup"

import { request } from "utils/api"
import { api, methods } from "constants/routes"
import { modulesList } from "../../ModuleList/list"
import { JSXElement } from "@babel/types"

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
	const imperialWebsiteModuleURL = `https://www.imperial.ac.uk/computing/current-students/courses/${moduleCode}/`

	let [buttons, setButtons] = useState<any>([])
	useEffect(() => {
		const onSuccess = (data: { [k: string]: any }) => {
			let piazzaLink = "https://piazza.com/class/"
			if (piazzaClasses[moduleID] !== undefined && piazzaClasses[moduleID]) {
				piazzaLink += piazzaClasses[moduleID]
			}

			let newButtons: any[] = [
				{
					title: "College Website",
					icon: faGlobe,
					url: imperialWebsiteModuleURL,
				},
				{
					title: "Piazza",
					icon: faUserFriends,
					url: piazzaLink,
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
				{moduleAims[moduleCode] || MODULE_AIMS_PLACEHOLDER}
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

const moduleAims: { [moduleCode: string]: JSX.Element } = {
	70008: (
		<>
			<p>
				The course is motivated by the increasing need for a theory of
				concurrent process in real systems and languages. Classroom sessions
				will include traditional lectures and some supervised problem solving,
				which are designed to illustrate the principles. The lab sessions will
				use one of the main stream programming languages for distributed
				communications and protocol description languages.
			</p>
			<p>
				The course provides the theories and techniques to analyse concurrent
				computations based on the basic mathematics behind process algebra and
				their type systems. The course will look at principles of concurrent
				message passing programming and software, addressing specification and
				design of message passing languages and distributed protocols. You will
				learn the application areas of concurrent processes and their type
				systems, including actor-based programs (such as Scala), channel-based
				programs (such as Go), network protocols (such as SMTP/HTTP), robotics
				programming and microservices.
			</p>
			More specifically students will:
			<ol>
				<li>
					Gain familiarity with the operational semantics and theory of
					concurrent processes.
				</li>
				<li>
					Learn the principles to evaluate various process calculi in the
					literature and examine their expressiveness.
				</li>
				<li>
					Learn a type theory of concurrency and communications in order to
					specify and verify message-passing communications.
				</li>
				<li>
					Practise concurrent processes and type theory via several applications
					-- network protocols, program analysis, and concurrent robotics.
				</li>
				<li>
					Be able to apply the taught techniques of concurrency theories to
					ensure correctness of concurrent applications such as deadlock-freedom
					and type/communication safety.
				</li>
			</ol>
		</>
	),
}

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
