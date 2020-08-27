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
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import CreatableSelect from "react-select/creatable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faFolder,
	faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./style.module.scss";
// import { request } from "../../../../../utils/api"
// import { api } from "../../../../../constants/routes"

interface UploadModalProps {
	show: boolean;
	onHide: any;
	categories: string[];
	tags: string[];
}

const UploadModal: React.FC<UploadModalProps> = ({
  	show,
	onHide,
	categories,
	tags,
}) => {
	const maxSize = 1048576;
	const prettyBytes = require('pretty-bytes');

	const onDrop = useCallback(acceptedFiles => {
		console.log(acceptedFiles);
	}, []);

	const { isDragActive, getRootProps, getInputProps, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
		onDrop,
		minSize: 0,
		maxSize,
		multiple: true,
	});

	const handleSubmit = (event: any) => {
		event.preventDefault();
		
		// fetch('/api/form-submit-url', {
		//   method: 'POST',
		//   body: data,
		// });
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
					<Tabs defaultActiveKey="file">
						<Tab eventKey="file" title="File">
							<div {...getRootProps({
								className: classNames(
									styles.dropzone,
									isDragAccept ? styles.accept : isDragReject ? styles.reject : ""
								)
							})}>
								<input {...getInputProps()}/>
								<FontAwesomeIcon icon={isDragActive ? faFolderOpen : faFolder}/>
								<p>Click here or drag and drop files to upload.</p>
							</div>

							<Accordion>
								{acceptedFiles.length > 0 && acceptedFiles.map((acceptedFile, index) => (
									<Card key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
											<Row>
												<Col>
													{acceptedFile.name}
													<span className={styles.filesizeDisplay}>
														{prettyBytes(acceptedFile.size)}
													</span> 
												</Col>
												<Col md="auto">
													<FontAwesomeIcon icon={faCaretDown}/>
												</Col>
											</Row>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={`${index}`}>
											<Card.Body>
												<ResourceDetailForm
													id={`${index}`}
													categories={categories}
													tags={tags}
													defaultTitle={acceptedFile.name}
												/>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								))}
							</Accordion>
						</Tab>

						<Tab eventKey="link" title="Link">
							<Form.Group>
								<Form.Label>URL</Form.Label>
								<Form.Control type="text" placeholder="Paste link here." />
							</Form.Group>

							<ResourceDetailForm
								id="link"
								categories={categories}
								tags={tags}
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

interface ResourceDetailFormProps {
	id: string;
	categories: string[];
	tags: string[];
	defaultTitle?: string;
}

const ResourceDetailForm: React.FC<ResourceDetailFormProps> = ({
	id,
	categories,
	tags,
	defaultTitle,
}) => {
	const [showPicker, setShowPicker] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	// Form responses
	// const [title, setTitle] = useState<string>(defaultTitle || "");
  	// const [category, setCategory] = useState("");
	// const [tagsInput, setTags] = useState<string[]>([]);

	return (<>
		<Form.Group>
			<Form.Label>Title</Form.Label>
			<Form.Control
				type="text"
				placeholder="Type a title for this resource here."
				defaultValue={defaultTitle}
			/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Category</Form.Label>
			<CreatableSelect
				isClearable
				options={categories.map(category => ({
					value: category,
					label: category,
				}))}
			/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Tags</Form.Label>
			<CreatableSelect
				isClearable
				isMulti
				options={tags.map(tag => ({
					value: tag,
					label: tag,
				}))}
			/>
		</Form.Group>

		<Form.Group>
			<Form.Switch
				id={`${id}-visibilityPickerSwitch`} 
				label="Visible immediately"
				onClick={() => setShowPicker(!showPicker)}
				defaultChecked
			/>
			{showPicker &&
			<DatePicker
				selected={startDate}
				onChange={(date:Date) => setStartDate(date)}
				locale="en-GB"
				showTimeInput
				timeFormat="p"
				dateFormat="Pp"
			/>}
  		</Form.Group>
	</>);
}

export default UploadModal;