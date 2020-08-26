import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import UploadModal from "./UploadModal"
import { Resource, Folder } from "../index";
import CategoryList from "components/molecules/CategoryList";
import CategoryHeader from "components/molecules/CategoryHeader";

export interface StaffViewProps {
	year: string;
	course: string;
  	folders: Folder[];
  	resources: Resource[];
  	searchText: string;
  	includeInSearchResult: (item: Resource, searchText: string) => boolean;
}

const StaffView: React.FC<StaffViewProps> = ({
	year,
	course,
  	folders,
  	resources,
  	searchText,
  	includeInSearchResult
}) => {
	const [modal, setModal] = useState("");
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
	tags = tags.filter(tag => tag !== "new");

	return (
    <>
		<UploadModal
			show={modal === "link"}
			onHide={closeModal}
			categories={folders.map(folder => folder.title)}
			tags={tags}
		/>

		{folders.map(({ title, id }) => {
			return (<div key={id}>
				<CategoryHeader
					heading={title}
				/>
				<CategoryList 
					categoryItems={filesContent.filter(res => res.folder === title)}
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
				onClick={() => setModal("link")}
				variant="secondary"	block
			>
				Upload Link
			</Button>
			</Col>
			<Col>
			<Button
				variant="secondary" block
			>
				Upload File
			</Button>
			</Col>
			<Col>
			<Button
				variant="secondary" block
			>
				Upload Directory
			</Button>
			</Col>
			<Col>
			<Button
				variant="warning" block
			>
				Remove All
			</Button>
			</Col>
		</Row>
    </>
	);
};

export default StaffView;