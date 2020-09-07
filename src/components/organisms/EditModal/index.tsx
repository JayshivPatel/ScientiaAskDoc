import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import ResourceDetailForm, { ResourceDetails } from "components/molecules/ResourceDetailForm"
import { Resource } from "components/pages/ModuleResources/utils";
import { staffRequest } from "utils/api"
import { api, methods } from "constants/routes"

interface EditModalProps {
	show: boolean;
	onHide: any;
	hideAndReload: () => void;
	tags: string[];
	resource: Resource;
}

const EditModal: React.FC<EditModalProps> = ({
  	show,
	onHide,
	hideAndReload,
	tags,
	resource
}) => {
    const [details, setDetails] = useState<ResourceDetails>();
    
	const updateResourceDetails = (details: ResourceDetails) => {
		setDetails(details);
	};

	const handleSubmit = async (event: any) => {
		if (details) {
			event.preventDefault();
			let payload: {[key: string]: any} = {
				title: details.title,
				tags: details.tags,
			};
			if (resource.type === "link") {
				payload.path = details.url;
			}
			if (details.visibleAfter) {
				payload.visible_after = details.visibleAfter;
			}
			staffRequest(api.MATERIALS_RESOURCES_ID(resource.id), methods.PUT, hideAndReload, () => {}, payload);
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
        		<Modal.Title>Edit Resource</Modal.Title>
      		</Modal.Header>

			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<ResourceDetailForm
						id={resource.id}
						key={resource.id}
						isLink={resource.type === "link"}
						tagList={tags}
						defaultTitle={resource.title}
						defaultURL={resource.path}
						defaultTags={resource.tags.filter(tag => tag !== "new")}
						defaultVisibleAfter={resource.visible_after}
						setResourceDetails={updateResourceDetails}
					/>
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
							Submit
						</Button>
					</ButtonGroup>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default EditModal;