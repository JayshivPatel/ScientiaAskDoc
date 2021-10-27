import React, { useEffect, useState } from "react"

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import FileItemRow from "components/rows/FileItemRow"
import { SelectionProps } from "components/pages/SelectionView"
import { resourceTypeToIcon } from "../../pages/modulePages/ModuleResources/utils"
import { IdBooleanMap, Resource } from "constants/types"
import { request } from "utils/api"
import { api, methods } from "constants/routes"

export interface CategoryListProps {
  categoryItems: Resource[]
  select?: SelectionProps
  showMenus?: IdBooleanMap
  displayingForStaff?: boolean
  setShowMenus?: (id: number) => (show: boolean) => void
  handleRowClick: (id: number) => void
  handleIconClick: (id: number) => void
  handleMouseOver: (id: number) => void
  handleMouseOut: (id: number) => void
}

export const DragHandle = SortableHandle(() => (
  <FontAwesomeIcon style={{ marginRight: "1rem" }} icon={faBars} />
))

const SortableItem = SortableElement(({ children }: { children: any }) => (
  <div>{children}</div>
))

const SortableList = SortableContainer(({ items }: { items: any[] }) => (
  <div>
    {items.map((item, index) => (
      <SortableItem key={`item-${index}`} index={index} children={item} />
    ))}
  </div>
))

const CategoryList: React.FC<CategoryListProps> = ({
  categoryItems,
  select,
  showMenus,
  setShowMenus,
  displayingForStaff = false,
  handleRowClick,
  handleIconClick,
  handleMouseOver,
  handleMouseOut,
}) => {
  const initListItems = (items: Resource[]) => {
    return items.map(
      ({ title, type, tags, downloads, visible_after, id, index }) => {
        if (type === undefined || tags === undefined) return null

        let icon =
          select && (select.isAnySelected() || select.state.isHoveringOver[id])
            ? select.state.isSelected[id]
              ? faCheckSquare
              : faSquare
            : resourceTypeToIcon(type)

        return (
          <FileItemRow
            onClick={() => handleRowClick(id)}
            onMouseOver={() => handleMouseOver(id)}
            onMouseOut={() => handleMouseOut(id)}
            onIconClick={() => handleIconClick(id)}
            showMenu={showMenus && showMenus[id]}
            setShowMenu={setShowMenus && setShowMenus(id)}
            icon={icon}
            tags={tags}
            downloads={undefined}
            invisible={visible_after.getTime() - Date.now() > 0}
            title={title}
            displayingForStaff={displayingForStaff}
            key={index}
          />
        )
      }
    )
  }

  const [resources, setResources] = useState(categoryItems)
  const [listItems, setListItems] = useState(initListItems(resources))

  useEffect(() => {
    setListItems(initListItems(resources))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenus, setShowMenus, resources])

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    let resourceToChange = resources.find((r) => r.index == oldIndex)!
    request({
      endpoint: api.MATERIALS_RESOURCES_ID(resourceToChange.id),
      method: methods.PUT,
      onSuccess: () => {
        setResources(reindexResources(resources, resourceToChange, newIndex))
      },
      onError: () => {},
      body: {
        index: newIndex,
      },
    })
  }

  function reindexResources(
    resources: Resource[],
    movedResource: Resource,
    newIndex: number
  ) {
    let newResources = resources.filter((r) => r.id !== movedResource.id)
    newResources = newResources
      .slice(0, newIndex)
      .concat([movedResource], newResources.slice(newIndex))
    return newResources.map((r, i) => ({ ...r, index: i }))
  }

  return (
    <div style={{ marginLeft: ".25rem" }}>
      {displayingForStaff ? (
        <SortableList
          items={listItems}
          onSortEnd={onSortEnd}
          onSortStart={(_, event) => event.preventDefault()}
          useDragHandle
        />
      ) : (
        listItems
      )}
    </div>
  )
}

export default CategoryList
