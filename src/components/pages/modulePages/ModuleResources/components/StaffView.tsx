import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"

import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons"
import AlertModal from "components/modals/AlertModal"
import UploadJumbotron from "components/suspense/UploadJumbotron"
import EditModal from "components/modals/EditModal"
import UploadModal from "components/modals/UploadModal"
import CategoryList from "components/sections/CategoryList"
import CategoryHeader from "components/headings/CategoryHeader"

import { request } from "utils/api"
import { api, methods } from "constants/routes"
import { Folder, IdBooleanMap, Resource } from "constants/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { categories } from "../utils"

export interface StaffViewProps {
  year: string
  course: string
  folders: Folder[]
  reload: () => void
  resources: Resource[]
  setResources: (resources: Resource[]) => void
  onItemClick: (id: number) => void
  searchText: string
  includeInSearchResult: (item: Resource, searchText: string) => boolean
}

const StaffView: React.FC<StaffViewProps> = ({
  year,
  course,
  folders,
  reload,
  resources,
  setResources,
  onItemClick,
  searchText,
  includeInSearchResult,
}) => {
  const [modal, setModal] = useState("")
  const [editResource, setEditResource] = useState<Resource>(resources[0])

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

  const titleDuplicated = (category: string, title: string): boolean => {
    return resources.some(
      (resource) => resource.category === category && resource.title === title
    )
  }

  const updateResources = (changedResources: Resource[]): void => {
    const changesMap = new Map(changedResources.map((r) => [r.id, r]))
    let newResources = resources.map((r) => changesMap.get(r.id) || r)
    setResources(newResources)
  }

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
          <Button onClick={() => setModal("alert")} block>
            Remove All
            <FontAwesomeIcon style={{ float: "right" }} icon={faTrash} />
          </Button>
        </Col>
      </Row>
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

      <AlertModal
        show={modal === "alert"}
        onHide={closeModal}
        title="Remove All Warning"
        message="This will irreversibly delete all course resources and associated files."
        confirmLabel="Delete All Resources"
        confirmOnClick={() =>
          request({
            endpoint: api.MATERIALS_RESOURCES,
            method: methods.DELETE,
            onSuccess: () => {
              closeModal()
              reload()
            },
            onError: () => {},
            body: {
              year: year,
              course: course,
            },
          })
        }
      />

      {resources.length === 0 ? (
        <UploadJumbotron
          message="No resources have been uploaded for this course yet."
          onClick={() => setModal("upload")}
        />
      ) : (
        <>
          <EditModal
            show={modal === "edit"}
            resource={editResource}
            categories={categories(folders)}
            tags={tags}
            hideModal={closeModal}
            reloadResources={reload}
            titleDuplicated={titleDuplicated}
          />
          {folders.map(({ title, id }) => (
            <div key={id}>
              <CategoryHeader heading={title} />
              <CategoryList
                displayingForStaff={true}
                onEditClick={() => {
                  setEditResource(
                    resources.find((res) => res.id === id) || resources[0]
                  )
                  setModal("edit")
                }}
                categoryItems={filesContent.filter(
                  (res) => res.category === title
                )}
                setCategoryItems={updateResources}
                handleRowClick={(id) => {
                  onItemClick(id)
                }}
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
