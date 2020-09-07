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
import ResourceDetailForm, { ResourceDetails } from "components/molecules/ResourceDetailForm"
import { staffRequest } from "utils/api"
import { api, methods } from "constants/routes"

interface UploadModalProps {
	show: boolean;
	onHide: any;
	hideAndReload: () => void;
	year: string;
	course: string;
	categories: string[];
	tags: string[];
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

	const updateResourceDetails = (id: number) => {
		return (details: ResourceDetails) => {
			resourceDetails[id] = details;
			setResourceDetails({...resourceDetails});
		};
	};

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

		const makePayload = (details: ResourceDetails) => {
			let payload: {[key: string]: any} = {
				year: year,
				course: course,
				type: tab,
				title: details.title,
				category: details.category,
				tags: details.tags,
				path: details.url,
			};
			if (details.visibleAfter) {
				payload.visible_after = details.visibleAfter;
			}
			return payload;
		}

		switch (tab) {
			case "file": {
				await Promise.all(acceptedFiles.map((file, index) => {
					if (rejectedFiles.includes(file)) {
						// Empty promise i.e. do nothing
						return Promise.resolve();
					}
					let payload = makePayload(resourceDetails[index]);
					return staffRequest(api.MATERIALS_RESOURCES, methods.POST, submitFileForResource(file), () => {}, payload);
				}));
		
				hideAndReload();
				break;
			}
			case "link": {
				let payload = makePayload(resourceDetails[-1]);
				await staffRequest(api.MATERIALS_RESOURCES, methods.POST, hideAndReload, () => {}, payload);
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
													isLink={false}
													defaultTitle={file.name}
													setResourceDetails={updateResourceDetails(index)}
												/>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								))}
							</Accordion>
						</Tab>

						<Tab eventKey="link" title="Link">
							<ResourceDetailForm
								id={-1}
								categories={categories}
								tagList={tags}
								isLink={true}
								setResourceDetails={updateResourceDetails(-1)}
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