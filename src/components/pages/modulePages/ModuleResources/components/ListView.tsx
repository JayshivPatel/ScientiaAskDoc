import React from "react"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import CategoryList from "components/sections/CategoryList"
import CategoryHeader from "components/headings/CategoryHeader"
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons"
import { Folder, Resource } from "constants/types"
import { api, methods } from "constants/routes"
import { request } from "utils/api"
import { useHistory } from "react-router-dom"

export interface ListViewProps {
  folders: Folder[]
  resources: Resource[]
  searchText: string
  onDownloadClick: (identifiers: number[]) => void
  onSectionDownloadClick: (title: string) => void
  includeInSearchResult: (item: Resource, searchText: string) => boolean
}

const ListView: React.FC<ListViewProps> = ({
  folders,
  resources,
  searchText,
  onDownloadClick,
  includeInSearchResult,
}) => {

  let history = useHistory()

  function openResource(id: number) {
    const onSuccess = (data: any) => {
      const course = data.course
      const category = data.category
      const index = data.index
      history.push(`/modules/${course}/resources/${category}/${index}`)
    }
    request({
      url: api.MATERIALS_RESOURCES_ID(id),
      method: methods.GET,
      onSuccess,
      onError: (message) => console.log(`Failed to obtain data for resource ${id}: ${message}`),
    })
  }


  let filesContent: Resource[] = resources
  if (searchText !== "") {
    filesContent = filesContent.filter((item) =>
      includeInSearchResult(item, searchText.toLowerCase())
    )
  }

  return (
    <SelectionView
      heading="Resources"
      onItemClick={openResource}
      onDownloadClick={onDownloadClick}
      selectionItems={filesContent}
      render={(select: SelectionProps) => (
        <>
          {folders.map(({ title, id }) => {
            let categoryItems = filesContent.filter(
              (res) => res.folder === title
            )
            function isAllSelected(): boolean {
              let isSelected = select.state.isSelected
              return categoryItems.every((item) => isSelected[item.id])
            }

            function onSelectAllClick() {
              let setValue = !isAllSelected()
              let isSelected = JSON.parse(
                JSON.stringify(select.state.isSelected)
              )
              for (let item in categoryItems) {
                isSelected[categoryItems[item].id] = setValue
              }
              select.setIsSelected(isSelected)
            }

            return (
              <div key={id}>
                <CategoryHeader
                  heading={title}
                  onSelectAllClick={onSelectAllClick}
                  selectAllIcon={isAllSelected() ? faCheckSquare : faSquare}
                  checkBoxColor={
                    select.isAnySelected()
                      ? "var(--secondary-text-color)"
                      : "var(--secondary-button-text)"
                  }
                />
                <CategoryList
                  categoryItems={categoryItems}
                  handleRowClick={select.handleCardClick}
                  handleIconClick={select.handleIconClick}
                  handleMouseOver={select.handleMouseOver}
                  handleMouseOut={select.handleMouseOut}
                  select={select}
                />
              </div>
            )
          })}
        </>
      )}
    />
  )
}

export default ListView
