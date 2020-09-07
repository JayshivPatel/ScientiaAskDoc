import React, { useState, useEffect } from "react";

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import FileListItem from "components/atoms/FileListItem";
import { SelectionProps } from "components/molecules/SelectionView";
import { resourceTypeToIcon } from "../../pages/ModuleResources/utils";
import { idBooleanMap, Resource } from "constants/types";
import { staffRequest } from "utils/api";
import { api, methods } from "constants/routes";

const arrayMove = require('array-move');

export interface CategoryListProps {
  categoryItems: Resource[];
  select?: SelectionProps;
  showMenus?: idBooleanMap,
  setShowMenus?: (id: number) => (show: boolean) => void,
  resourceActions?: (id: number, filename: string) => any;
  handleRowClick: (id: number) => void;
  handleIconClick: (id: number) => void;
  handleMouseOver: (id: number) => void;
  handleMouseOut: (id: number) => void;
}

export const DragHandle = SortableHandle(() => <FontAwesomeIcon style={{ marginRight: "1rem" }} icon={faBars}/>);

const SortableItem = SortableElement(({children}: {children: any}) =>
  <div>{children}</div>
);

const SortableList = SortableContainer(({items}: {items: any[]}) =>
  <div>
    {items.map((item, index) => (
      <SortableItem
        key={`item-${index}`}
        index={index}
        children={item}
      />
    ))}
  </div>
);

const CategoryList: React.FC<CategoryListProps> = ({
  categoryItems,
  select,
  showMenus,
  setShowMenus,
  resourceActions,
  handleRowClick,
  handleIconClick,
  handleMouseOver,
  handleMouseOut,
}) => {
  let oldIndexes: number[] = categoryItems.map(resource => resource.index);

  const initListItems = (items: Resource[]) => items.map(({ title, type, tags, id, index }) => {
    if (type === undefined || tags === undefined) return null;

    let icon =
      select && (select.isAnySelected() || select.state.isHoveringOver[id])
        ? select.state.isSelected[id]
          ? faCheckSquare
          : faSquare
        : resourceTypeToIcon(type);

    return (
      <FileListItem
        onClick={() => handleRowClick(id)}
        onMouseOver={() => handleMouseOver(id)}
        onMouseOut={() => handleMouseOut(id)}
        onIconClick={() => handleIconClick(id)}
        showMenu={showMenus && showMenus[id]}
        setShowMenu={setShowMenus && setShowMenus(id)}
        icon={icon}
        tags={tags}
        title={title}
        resourceActions={resourceActions ? resourceActions(id, title) : null}
        key={index}
      />
    );
  });

  const [listItems, setListItems] = useState(initListItems(categoryItems));
  const [resources, setResources] = useState(categoryItems);

  useEffect(() => {
    setListItems(initListItems(resources));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenus, setShowMenus]);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex : number, newIndex: number }) => {
    setListItems(arrayMove(listItems, oldIndex, newIndex));
    // Since state does not update immediately, save reordered array as a local variable
    let newResources = arrayMove(resources, oldIndex, newIndex);
    setResources(newResources);
    // Only need to modify array subset between target indices
    let minIndex = Math.min(oldIndex, newIndex);
    let maxIndex = Math.max(oldIndex, newIndex) + 1;
    let indexes = oldIndexes.slice(minIndex, maxIndex);

    newResources.slice(minIndex, maxIndex).forEach((resource, i) => {
      staffRequest(api.MATERIALS_RESOURCES_ID(resource.id), methods.PUT, () => {}, () => {}, {
        index: indexes[i]
      });
    })
  }

  return (
    <div style={{marginLeft: ".25rem"}}>
      { resourceActions ?
        <SortableList
          items={listItems}
          onSortEnd={onSortEnd}
          onSortStart={(_, event) => event.preventDefault()}
          useDragHandle
        />
      : listItems
      }
    </div>
  );
};

export default CategoryList;
