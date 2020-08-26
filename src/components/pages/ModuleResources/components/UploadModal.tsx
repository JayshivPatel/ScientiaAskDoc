import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import CreatableSelect from 'react-select/creatable';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab' 


interface Props {
	show: boolean;
	onHide: any;
	categories: string[];
	tags: string[];
}

const UploadModal: React.FC<Props> = ({
  	show,
	onHide,
	categories,
	tags,
}) => {
	return (
		<Modal
			style={{ zIndex: "10000" }}
      		show={show}
      		onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
        		<Modal.Title>Upload Resource</Modal.Title>
      		</Modal.Header>
			<Form>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Title</Form.Label>
    				<Form.Control type="text" placeholder="Type a title for this resource here." />
					</Form.Group>
					<Tabs defaultActiveKey="file">
						<Tab eventKey="file" title="File">
							<Form.Group>
								<Form.File label="Upload file for resource" />
							</Form.Group>
						</Tab>
						<Tab eventKey="link" title="Link">
							<Form.Group>
								<Form.Label>URL</Form.Label>
								<Form.Control type="text" placeholder="Paste link here." />
							</Form.Group>
						</Tab>
					</Tabs>
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