import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faDownload, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import AlertModal from "components/atoms/AlertModal"
import IconButton from "components/atoms/IconButton"
import WarningJumbotron from "components/atoms/WarningJumbotron";
import EditModal from "components/organisms/EditModal"
import UploadModal from "components/organisms/UploadModal"
import CategoryList from "components/molecules/CategoryList";
import CategoryHeader from "components/molecules/CategoryHeader";

import { staffRequest, download } from "utils/api"
import { api, methods } from "constants/routes"
import { Folder, Resource, idBooleanMap } from "constants/types";

export interface StaffViewProps {
	year: string;
	course: string;
	folders: Folder[];
	reload: () => void;
	resources: Resource[];
	searchText: string;
	includeInSearchResult: (item: Resource, searchText: string) => boolean;
	onRowClick: (id: number) => void;
}

const StaffView: React.FC<StaffViewProps> = ({
	year,
	course,
	folders,
	reload,
	resources,
	searchText,
	includeInSearchResult,
	onRowClick
}) => {
	const [modal, setModal] = useState("");
	const [resourceID, setResourceID] = useState(-1);
	const [editResource, setEditResource] = useState<Resource>(resources[0]);
	const allClosed = () => resources.reduce((map, resource) => {
		return {
			...map,
			[resource.id]: false
		};
	}, {});
	const [showMenus, setShowMenus] = useState<idBooleanMap>(allClosed());
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
	// Remove reserved tag `new` from selection pool, then arrange alphabetically
	tags = tags.filter(tag => tag !== "new").sort();

	const hiddenFileInput = React.createRef<HTMLInputElement>()
	const handleReuploadClick = (id: number) => {
		if (hiddenFileInput.current) {
			setResourceID(id);
			hiddenFileInput.current.click();
		}
	};
	const reuploadFile = async (event: any) => {
		const fileUploaded = event.target.files[0];
		let formData = new FormData();
		formData.append("file", fileUploaded);

		await staffRequest({
			url: api.MATERIALS_RESOURCES_FILE(resourceID),
			method: methods.PUT,
			onSuccess: () => {},
			onError: () => {},
			body: formData,
			sendFile: true
		});
		reload();
	};

	const titleDuplicated = (category: string, title: string): boolean => {
		return resources.some(resource => resource.folder === category && resource.title === title);
	}

	const resourceActions = (id: number, filename: string) => (
		<ButtonGroup>
			<IconButton
				tooltip="Edit"
				onClick={() => {
					setEditResource(resources.find(res => res.id === id) || resources[0]);
					setModal("edit");
				}}
				icon={faEdit}
			/>
			<IconButton
				tooltip="Delete"
				onClick={async () => {
					await staffRequest({
						url: api.MATERIALS_RESOURCES_ID(id),
						method: methods.DELETE,
						onSuccess: () => {},
						onError: () => {}
					});
					reload();
				}}
				icon={faTrash}
			/>
			{filename && <>
			<IconButton
				tooltip="Download"
				onClick={() => download(api.MATERIALS_RESOURCES_FILE(id), filename)}
				icon={faDownload} />
			<IconButton
				tooltip="Reupload"
				onClick={() => handleReuploadClick(id)}
				icon={faUpload}
			/>
			</>}
		</ButtonGroup>
	)

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
			categories={folders.length === 0 ? ["Lecture Notes"] : folders.map(folder => folder.title).sort()}
			tags={tags}
			titleDuplicated={titleDuplicated}
		/>

		<AlertModal
			show={modal === "alert"}
			onHide={closeModal}
			title="Remove All Warning"
			message="This will irreversibly delete all course resources and associated files."
			confirmLabel="Delete All Resources"
			confirmOnClick={() => staffRequest({
				url: api.MATERIALS_RESOURCES,
				method: methods.DELETE,
				onSuccess: () => {
					closeModal();
					reload();
				},
				onError: () => {},
				body: {
					year: year,
					course: course
				}
			})}
		/>

		{resources.length === 0
			? <WarningJumbotron message="No resources have been uploaded for this course yet." />
			: <>
				<EditModal
					show={modal === "edit"}
					onHide={closeModal}
					hideAndReload={() => {
						closeModal();
						reload();
					}}
					tags={tags}
					resource={editResource}
					titleDuplicated={titleDuplicated}
				/>
				{folders.map(({ title, id }) => (<div key={id}>
					<CategoryHeader
						heading={title}
					/>
					<CategoryList
						categoryItems={filesContent.filter(res => res.folder === title)}
						resourceActions={resourceActions}
						showMenus={showMenus}
						setShowMenus={(id) => {
							return (show: boolean) => {
								let newShowMenus: idBooleanMap = allClosed();
								newShowMenus[id] = show;
								setShowMenus(newShowMenus);
							};
						}}
						handleRowClick={onRowClick}
						handleIconClick={(id) => {}}
						handleMouseOver={(id) => {}}
						handleMouseOut={(id) => {}}
					/>
				</div>))}
			</>
		}

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
    </>
	);
};

export default StaffView;