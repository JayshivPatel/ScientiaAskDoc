import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

import styles from "./style.module.scss"
import ResourceDetailForm, {
  ResourceDetails,
} from "components/sections/ResourceDetailForm"
import { Resource } from "constants/types"
import { request } from "utils/api"
import { api, methods } from "constants/routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

interface EditModalProps {
  show: boolean
  onHide: any
  hideAndReload: () => void
  tags: string[]
  categories: string[]
  resource: Resource
  titleDuplicated: (category: string, title: string) => boolean
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  onHide,
  hideAndReload,
  tags,
  categories,
  resource,
  titleDuplicated,
}) => {
  const [details, setDetails] = useState<ResourceDetails>()
  const [canSubmitChanges, setCanSubmitChanges] = useState<boolean>(false)
  const updateResourceDetails = (details: ResourceDetails) => {
    setDetails(details)
  }

  const handleSubmit = async (event: any) => {
    if (details) {
      event.preventDefault()
      let payload: { [key: string]: any } = {
        title: details.title,
        tags: details.tags,
        category: details.category,
        index: resource.index,
      }
      if (resource.type === "link") {
        payload.path = details.url
      }
      if (details.visibleAfter) {
        payload.visible_after = details.visibleAfter
      }
      request({
        endpoint: api.MATERIALS_RESOURCES_ID(resource.id),
        method: methods.PUT,
        onSuccess: hideAndReload,
        onError: () => {},
        body: payload,
      })
    }
  }

  return (
    <Modal
      style={{ zIndex: "10000" }}
      size="lg"
      show={show}
      onHide={onHide}
      centered
      className={styles.editModal}>
      <Modal.Header>
        <Modal.Title style={{ fontSize: "1.25rem" }}>Edit Resource</Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}>
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <ResourceDetailForm
            id={resource.id}
            key={resource.id}
            isLink={resource.type === "link" || resource.type === "video"}
            tagList={tags}
            categories={categories}
            defaultTitle={resource.title}
            defaultURL={resource.path}
            defaultCategory={resource.category}
            defaultTags={resource.tags.filter((tag) => tag !== "new")}
            defaultVisibleAfter={resource.visible_after}
            handleInvalidDetails={setCanSubmitChanges}
            titleDuplicated={titleDuplicated}
            setResourceDetails={updateResourceDetails}
          />
        </Modal.Body>

        <Modal.Footer>
          <ButtonGroup className="btn-block">
            <Button onClick={onHide} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmitChanges} variant="info">
              Submit
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditModal
