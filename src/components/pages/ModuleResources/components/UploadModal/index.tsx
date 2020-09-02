import React, { useState, useCallback } from "react";
import classNames from "classnames";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab"; 
import Tabs from "react-bootstrap/Tabs";
import { useDropzone } from "react-dropzone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faTimes,
	faFolder,
	faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./style.module.scss";
import ResourceDetailForm from "../../../../molecules/ResourceDetailForm"
import { staffRequest } from "../../../../../utils/api"
import { api, methods } from "../../../../../constants/routes"

interface UploadModalProps {
	show: boolean;
	onHide: any;
	hideAndReload: () => void;
	year: string;
	course: string;
	categories: string[];
	tags: string[];
}

export interface ResourceDetails {
	title: string;
	category: string;
	tags: string[];
	visibleAfter: string;
}

const UploadModal: React.FC<UploadModalProps> = ({
  	show,
	onHide,
	hideAndReload,
	year,
	course,
	categories,
	tags,
}) => {
	const [tab, setTab] = useState("file");
	const [url, setURL] = useState("");
	const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
	const [resourceDetails, setResourceDetails] = useState<{[id: number] : ResourceDetails}>({});
	const maxSize =  26214400; // 25mb, TODO: lift to constants
	const prettyBytes = require("pretty-bytes");

	const onDrop = useCallback(acceptedFiles => {
		const newFiles = rejectedFiles.filter(file => !acceptedFiles.includes(file));
		setRejectedFiles(newFiles);
	}, [rejectedFiles]);

	const { isDragActive, getRootProps, getInputProps, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
		onDrop,
		minSize: 0,
		maxSize,
		multiple: true,
	});

	const removeFile = (file: File) => {
		const newFiles = [...rejectedFiles, file];
		setRejectedFiles(newFiles);
	}

	const updateResourceDetails = (id: number, details: ResourceDetails) => {
		resourceDetails[id] = details;
		setResourceDetails({...resourceDetails});
	}

	const submitFileForResource = (file: File) => {
		let formData = new FormData()
		formData.append("file", file);
		return (data: { json: () => Promise<any>; }) => {
			data.json().then((data) => {
				staffRequest(api.MATERIALS_RESOURCES_FILE(data["id"]), methods.PUT, () => {}, () => {}, formData, true);
			})
		};
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		switch (tab) {
			case "file": {
				await Promise.all(acceptedFiles.map((file, index) => {
					if (rejectedFiles.includes(file)) {
						// Empty promise i.e. do nothing
						return Promise.resolve();
					}
		
					let details: ResourceDetails = resourceDetails[index];
					let payload: {[key: string]: any} = {
						type: "file",
						category: details.category,
						course: course,
						title: details.title,
						year: year,
						tags: details.tags,
						path: "",
					};
					if (details.visibleAfter !== "") {
						payload.visible_after = details.visibleAfter;
					}
					return staffRequest(api.MATERIALS_RESOURCES, methods.POST, submitFileForResource(file), () => {}, payload);
				}));
		
				hideAndReload();
				break;
			}
			case "link": {
				let details: ResourceDetails = resourceDetails[-1];
				let payload: {[key: string]: any} = {
					type: "link",
					category: details.category,
					course: course,
					title: details.title,
					year: year,
					tags: details.tags,
					path: url,
				};
				if (details.visibleAfter !== "") {
					payload.visible_after = details.visibleAfter;
				}
				staffRequest(api.MATERIALS_RESOURCES, methods.POST, hideAndReload, () => {}, payload);
				break;
			}
		}
		
	}

	return (
		<Modal
			style={{ zIndex: "10000" }}
			size="lg"
      		show={show}
      		onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
        		<Modal.Title>Upload Resource</Modal.Title>
      		</Modal.Header>

			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<Tabs activeKey={tab} onSelect={tab => setTab(tab ? tab : "file")}>
						<Tab eventKey="file" title="File">
							<div {...getRootProps({
								className: classNames(
									styles.dropzone,
									styles.clickable,
									isDragAccept ? styles.accept : isDragReject ? styles.reject : ""
								)
							})}>
								<input {...getInputProps()}/>
								<FontAwesomeIcon icon={isDragActive ? faFolderOpen : faFolder}/>
								<p>Click here or drag and drop files to upload.</p>
							</div>

							<Accordion>
								{acceptedFiles.length > 0 && acceptedFiles.map((file, index) => (
									!rejectedFiles.includes(file) &&
									<Card key={index}>
										<Accordion.Toggle
											as={Card.Header}
											eventKey={`${index}`}
											className={styles.clickable}
										>
											<Row>
												<Col md="auto">
													<FontAwesomeIcon icon={faCaretDown}/>
												</Col>
												<Col>
													{file.name}
													<span className={styles.filesizeDisplay}>
														{prettyBytes(file.size)}
													</span> 
												</Col>
												<Col md="auto">
													<FontAwesomeIcon icon={faTimes} onClick={e => {
														e.stopPropagation();
														removeFile(file);
													}}/>
												</Col>
											</Row>
										</Accordion.Toggle>

										<Accordion.Collapse eventKey={`${index}`}>
											<Card.Body>
												<ResourceDetailForm
													id={index}
													key={index}
													categories={categories}
													tagList={tags}
													defaultTitle={file.name}
													setResourceDetails={updateResourceDetails}
												/>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								))}
							</Accordion>
						</Tab>

						<Tab eventKey="link" title="Link">
							<Form.Group className={styles.tabFirstFormGroup}>
								<Form.Label>URL</Form.Label>
								<Form.Control
									type="text"
									placeholder="Paste link here."
									onChange={e => setURL(e.target.value)}
								/>
							</Form.Group>

							<ResourceDetailForm
								id={-1}
								categories={categories}
								tagList={tags}
								setResourceDetails={updateResourceDetails}
							/>
						</Tab>
					</Tabs>
				</Modal.Body>

				<Modal.Footer>
					<ButtonGroup className="btn-block">
						<Button
							onClick={onHide}
							variant="secondary"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="info"
						>
							Upload
						</Button>
					</ButtonGroup>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default UploadModal;