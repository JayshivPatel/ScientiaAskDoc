import React from "react"
import { Helmet } from "react-helmet"
import Dandruff from "components/headings/Dandruff"
import styles from "./style.module.scss"
import classNames from "classnames"
import { faGlobe, faUserFriends } from "@fortawesome/free-solid-svg-icons"
import PageButtonGroup from "components/groups/PageButtonGroup"

import { teachingAims } from "../../ModuleList/aims"

interface Props {
	year: string
	moduleTitle: string
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

const ModuleDashboard: React.FC<Props> = ({ year, moduleTitle, moduleID }) => {
	const moduleCode = moduleID.match(/^CO\d+/) ? moduleID.slice(2) : moduleID

	let buttons: any[] = [
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

	return (
		<>
			<Helmet>
				<title>Overview | {moduleTitle} | Scientia</title>
			</Helmet>
			<Dandruff
				heading={moduleTitle ? `${moduleID} - ${moduleTitle}` : moduleID}
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
