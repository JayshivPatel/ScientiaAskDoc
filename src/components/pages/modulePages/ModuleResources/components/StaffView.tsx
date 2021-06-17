import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"

import {faEdit, faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import {
  faDownload,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons"
import AlertModal from "components/modals/AlertModal"
import IconButton from "components/buttons/IconButton"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import EditModal from "components/modals/EditModal"
import UploadModal from "components/modals/UploadModal"
import CreateModal from "components/modals/CreateModal"
import CategoryList from "components/sections/CategoryList"
import CategoryHeader from "components/headings/CategoryHeader"

import { download, request } from "utils/api"
import { api, methods } from "constants/routes"
import { Folder, Resource, IdBooleanMap } from "constants/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { categories } from "../utils"
import moment from "moment"

export interface StaffViewProps {
  year: string
  course: string
  folders: Folder[]
  reload: () => void
  resources: Resource[]
  searchText: string
  includeInSearchResult: (item: Resource, searchText: string) => boolean
  onRowClick: (id: number) => void
}

const StaffView: React.FC<StaffViewProps> = ({
  year,
  course,
  folders,
  reload,
  resources,
  searchText,
  includeInSearchResult,
  onRowClick,
}) => {
  const [modal, setModal] = useState("")
  const [resourceID, setResourceID] = useState(-1)
  const [editResource, setEditResource] = useState<Resource>(resources[0])
  const allClosed = () =>
    resources.reduce((map, resource) => {
      return {
        ...map,
        [resource.id]: false,
      }
    }, {})
  const [showMenus, setShowMenus] = useState<IdBooleanMap>(allClosed())
  const closeModal = () => setModal("")

  let filesContent: Resource[] = resources
  if (searchText !== "") {
    filesContent = filesContent.filter((item) =>
      includeInSearchResult(item, searchText.toLowerCase())
    )
  }

  // Get existing tags for selection upon new resource creation
  let tags: string[] = resources.flatMap((resource) => resource.tags)
  tags = Array.from(new Set(tags))
  // Remove reserved tag `new` from selection pool, then arrange alphabetically
  tags = tags.filter((tag) => tag !== "new").sort()

  const hiddenFileInput = React.createRef<HTMLInputElement>()
  const handleReuploadClick = (id: number) => {
    if (hiddenFileInput.current) {
      setResourceID(id)
      hiddenFileInput.current.click()
    }
  }
  const reuploadFile = async (event: any) => {
    const fileUploaded = event.target.files[0]
    let formData = new FormData()
    formData.append("file", fileUploaded)

    await request({
      api: api.MATERIALS_RESOURCES_FILE(resourceID),
      method: methods.PUT,
      body: formData,
      sendFile: true,
    })
    .catch(() => {})
    reload()
  }

  const titleDuplicated = (category: string, title: string): boolean => {
    return resources.some(
      (resource) => resource.folder === category && resource.title === title
    )
  }

  const resourceActions = (id: number, filename: string) => (
    <ButtonGroup>
      <IconButton
        tooltip="Edit"
        onClick={() => {
          setEditResource(
            resources.find((res) => res.id === id) || resources[0]
          )
          setModal("edit")
        }}
        icon={faEdit}
      />
      <IconButton
        tooltip="Delete"
        onClick={async () => {
          await request({
            api: api.MATERIALS_RESOURCES_ID(id),
            method: methods.DELETE,
          })
          .catch(() => {})
          reload()
        }}
        icon={faTrash}
      />
      {filename && (
        <>
          <IconButton
            tooltip="Download"
            onClick={() => download(api.MATERIALS_RESOURCES_FILE(id), filename)}
            icon={faDownload}
          />
          <IconButton
            tooltip="Reupload"
            onClick={() => handleReuploadClick(id)}
            icon={faUpload}
          />
        </>
      )}
    </ButtonGroup>
  )

  return (
    <>
      <Row style={{ marginTop: "0.625rem" }}>
        <Col style={{ paddingRight: "0.3125rem" }}>
          <Button onClick={() => setModal("upload")} block>
            Upload
            <FontAwesomeIcon style={{ float: "right" }} icon={faUpload} />
          </Button>
        </Col>
        <Col style={{ paddingLeft: "0.3125rem" }}>
          <Button onClick={() => setModal("create")} block>
            {/*Remove All*/}
            Add new Exercise
            <FontAwesomeIcon style={{ float: "right" }} icon={faPlusSquare} />
          </Button>
        </Col>
      </Row>
      <input type="file" ref={hiddenFileInput} onChange={reuploadFile} hidden />
      <UploadModal
        show={modal === "upload"}
        onHide={closeModal}
        hideAndReload={() => {
          closeModal()
          reload()
        }}
        year={year}
        course={course}
        categories={categories(folders)}
        tags={tags}
        titleDuplicated={titleDuplicated}
      />

      <CreateModal
        show={modal === "create"}
        onHide={closeModal}
        hideAndReload={() => {
          closeModal();
          reload()
        }}
        year={year}
        course={course}
        startDate={moment.now()}
        dueDate={moment.now()}/>

      <AlertModal
        show={modal === "alert"}
        onHide={closeModal}
        title="Remove All Warning"
        message="This will irreversibly delete all course resources and associated files."
        confirmLabel="Delete All Resources"
        confirmOnClick={() =>
          request({
            api: api.MATERIALS_RESOURCES(),
            method: methods.DELETE,
            body: {
              year: year,
              course: course,
            },
          })
          .then(() => {
            closeModal()
            reload()
          })
          .catch(() => {})
        }
      />

      {resources.length === 0 ? (
        <WarningJumbotron message="No resources have been uploaded for this course yet." />
      ) : (
        <>
          <EditModal
            show={modal === "edit"}
            onHide={closeModal}
            hideAndReload={() => {
              closeModal()
              reload()
            }}
            tags={tags}
            categories={categories(folders)}
            resource={editResource}
            titleDuplicated={titleDuplicated}
          />
          {folders.map(({ title, id }) => (
            <div key={id}>
              <CategoryHeader heading={title} />
              <CategoryList
                categoryItems={filesContent.filter(
                  (res) => res.folder === title
                )}
                resourceActions={resourceActions}
                showMenus={showMenus}
                setShowMenus={(id) => {
                  return (show: boolean) => {
                    let newShowMenus: IdBooleanMap = allClosed()
                    newShowMenus[id] = show
                    setShowMenus(newShowMenus)
                  }
                }}
                handleRowClick={onRowClick}
                handleIconClick={(id) => {}}
                handleMouseOver={(id) => {}}
                handleMouseOut={(id) => {}}
              />
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default StaffView
