import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/esm/Row";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faDownload, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadModal from "./UploadModal"
import AlertModal from "../../../atoms/AlertModal"
import { Resource, Folder } from "../";
import CategoryList from "components/molecules/CategoryList";
import CategoryHeader from "components/molecules/CategoryHeader";

import { staffRequest, download } from "../../../../utils/api"
import { api, methods } from "../../../../constants/routes"

export interface StaffViewProps {
	year: string;
	course: string;
	folders: Folder[];
	reload: () => void;
  	resources: Resource[];
  	searchText: string;
  	includeInSearchResult: (item: Resource, searchText: string) => boolean;
}

const StaffView: React.FC<StaffViewProps> = ({
	year,
	course,
	folders,
	reload,
  	resources,
  	searchText,
  	includeInSearchResult
}) => {
	const [modal, setModal] = useState("");
	const [resourceID, setResourceID] = useState(-1);
	const closeModal = () => setModal("");

	let filesContent: Resource[] = resources;
	if (searchText !== "") {
		filesContent = filesContent.filter((item) =>
			includeInSearchResult(item, searchText.toLowerCase())
		);
	}

	// Get existing tags for selection upon new resource creation
	let tags: string[] = resources.flatMap(resource => resource.tags)
	tags = Array.from(new Set(tags))
	// "new" tag is determined by backend, remove it from selection pool
	tags = tags.filter(tag => tag !== "new" && tag !== "");

	const hiddenFileInput = React.createRef<HTMLInputElement>()
	const handleReuploadClick = (id: number) => {
		if (hiddenFileInput.current) {
			setResourceID(id);
			hiddenFileInput.current.click();
		}
	};
	const reuploadFile = (event: any) => {
		const fileUploaded = event.target.files[0];
		let formData = new FormData();
		formData.append("file", fileUploaded);

		staffRequest(api.MATERIALS_RESOURCES_FILE(resourceID), methods.PUT,
			() => {}, () => {}, formData, true
		)
	};

	const fileDropdown = (id: number, filename: string) => {
		return (
			<>
				<FontAwesomeIcon onClick={() => {}} icon={faEdit} />
				<FontAwesomeIcon onClick={() => staffRequest(api.MATERIALS_RESOURCES_ID(id), methods.DELETE, () => {}, () => {})} icon={faTrash}/>
				{filename && <>
				<FontAwesomeIcon onClick={() => download(api.MATERIALS_RESOURCES_FILE(id), methods.GET, filename)} icon={faDownload} />
				<FontAwesomeIcon onClick={() => handleReuploadClick(id)} icon={faUpload}/>
				</>}
			</>
		);
	}

	return (
    <>
		<input
        	type="file"
        	ref={hiddenFileInput}
        	onChange={reuploadFile}
        	hidden
      	/>
		<UploadModal
			show={modal === "upload"}
			onHide={closeModal}
			hideAndReload={() => {
				closeModal();
				reload();
			}}
			year={year}
			course={course}
			categories={folders.map(folder => folder.title).sort() || ["Lecture notes"]}
			tags={tags.sort()}
		/>

		{folders.map(({ title, id }) => {
			return (<div key={id}>
				<CategoryHeader
					heading={title}
				/>
				<CategoryList 
					categoryItems={filesContent.filter(res => res.folder === title)}
					fileDropdown={fileDropdown}
					handleRowClick={(id) => {}}
					handleIconClick={(id) => {}}
					handleMouseOver={(id) => {}}
					handleMouseOut={(id) => {}}
				/>
			</div>)
		})}
    	<Row style={{ marginTop: "1rem" }}>
			<Col>
				<Button
					onClick={() => setModal("upload")}
					variant="info" block
				>
					Upload Resources
				</Button>
			</Col>
			<Col>
				<Button
					onClick={() => setModal("alert")}
					variant="warning" block
				>
					Remove All
				</Button>
			</Col>
		</Row>

		<AlertModal
			show={modal === "alert"}
			onHide={closeModal}
			title="Remove All Warning"
			message="This will irreversibly delete all course resources and associated files."
			confirmLabel="Delete All Resources"
			confirmOnClick={() => staffRequest(
				api.MATERIALS_RESOURCES,
				methods.DELETE,
				() => {
					closeModal();
					reload();
				},
				() => {},
				{
					year: year,
					course: course
				}
			)}
		/>
    </>
	);
};

export default StaffView;