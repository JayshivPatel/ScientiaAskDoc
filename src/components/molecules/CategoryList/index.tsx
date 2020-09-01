import React from "react";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { SelectionProps } from "components/molecules/SelectionView";
import { resourceTypeToIcon } from "../../pages/ModuleResources";
import FileListItem from "components/atoms/FileListItem";

const CategoryList: React.FC<{ select: SelectionProps }> = ({ select }) => {
  return (
    <>
      {select.selectionItems.map(({ title, type, tags, id }) => {
        if (type === undefined || tags === undefined) return null;

        let icon =
          select.isAnySelected() || select.state.isHoveringOver[id]
            ? select.state.isSelected[id]
              ? faCheckSquare
              : faSquare
            : resourceTypeToIcon(type);

        return (
          <FileListItem
            onClick={() => select.handleCardClick(id)}
            onMouseOver={() => select.handleMouseOver(id)}
						onMouseOut={() => select.handleMouseOut(id)}
						onIconClick={() => select.handleIconClick(id)}
            icon={icon}
            tags={tags}
            id={id}
						title={title}
						key={id}
          />
        );
      })}
    </>
  );
};

export default CategoryList;
