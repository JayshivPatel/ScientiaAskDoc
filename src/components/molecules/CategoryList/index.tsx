import React from "react";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { Resource, resourceTypeToIcon } from "../../pages/ModuleResources/utils";
import { SelectionProps } from "components/molecules/SelectionView";
import FileListItem from "components/atoms/FileListItem";

export interface CategoryListProps {
  categoryItems: Resource[];
  select?: SelectionProps;
  fileDropdown?: (id: number, filename: string) => any;
  handleRowClick: (id: number) => void;
  handleIconClick: (id: number) => void;
  handleMouseOver: (id: number) => void;
  handleMouseOut: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categoryItems,
  select,
  fileDropdown,
  handleRowClick,
  handleIconClick,
  handleMouseOver,
  handleMouseOut,
}) => {
  return (
    <div style={{marginLeft: ".25rem"}}>
      {categoryItems.map(({ title, type, tags, id }) => {
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
            icon={icon}
            tags={tags}
						title={title}
						key={id}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
