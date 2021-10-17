import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"

import styles from "./style.module.scss"
import ResourceDetailForm, {
  ResourceDetails,
} from "components/sections/ResourceDetailForm"
import { Resource } from "constants/types"
import { download, request } from "utils/api"
import { api, methods } from "constants/routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDownload,
  faTimes,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons"

interface EditModalProps {
  show: boolean
  resource: Resource
  categories: string[]
  tags: string[]
  hideModal: () => void
  reloadResources: () => void
  titleDuplicated: (category: string, title: string) => boolean
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  resource,
  categories,
  tags,
  hideModal,
  reloadResources,
  titleDuplicated,
}) => {
  const [details, setDetails] = useState<ResourceDetails>()
  const [canSubmitChanges, setCanSubmitChanges] = useState<boolean>(false)
  const updateResourceDetails = (details: ResourceDetails) => {
    setDetails(details)
  }

  const hiddenFileInput = React.createRef<HTMLInputElement>()
  const handleReuploadClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    }
  }
  const reuploadFile = async (event: any) => {
    const fileUploaded = event.target.files[0]
    let formData = new FormData()
    formData.append("file", fileUploaded)

    await request({
      endpoint: api.MATERIALS_RESOURCES_FILE(resource.id),
      method: methods.PUT,
      onSuccess: () => {},
      onError: () => {},
      body: formData,
      sendFile: true,
    })
    reloadResources()
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
        onSuccess: () => {
          hideModal()
          reloadResources()
        },
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
      onHide={hideModal}
      centered
      className={styles.editModal}>
      <Modal.Header>
        <Modal.Title style={{ fontSize: "1.25rem" }}>Edit Resource</Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={hideModal}>
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>

      <input type="file" ref={hiddenFileInput} onChange={reuploadFile} hidden />

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
            <Button
              onClick={() =>
                download(
                  api.MATERIALS_RESOURCES_FILE(resource.id),
                  resource.title
                )
              }
              variant="secondary">
              <FontAwesomeIcon
                style={{ marginRight: "0.3125rem" }}
                icon={faDownload}
              />
              Download
            </Button>
            <Button onClick={handleReuploadClick} variant="secondary">
              <FontAwesomeIcon
                style={{ marginRight: "0.3125rem" }}
                icon={faUpload}
              />
              Reupload
            </Button>
            <Button
              onClick={async () => {
                await request({
                  endpoint: api.MATERIALS_RESOURCES_ID(resource.id),
                  method: methods.DELETE,
                  onSuccess: () => {},
                  onError: () => {},
                })
                hideModal()
                reloadResources()
              }}
              variant="danger">
              <FontAwesomeIcon
                style={{ marginRight: "0.3125rem" }}
                icon={faTrash}
              />
              Delete
            </Button>
          </ButtonGroup>
          <ButtonGroup className="btn-block">
            <Button onClick={hideModal} variant="secondary">
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
