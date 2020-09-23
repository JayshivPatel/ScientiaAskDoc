import React from "react";
import SelectionView, { SelectionProps } from "components/sections/SelectionView";
import QuickAccessRow from "components/rows/QuickAccessRow";
import { BasicResource, Module } from "constants/types";

export interface QuickAccessViewProps {
  resources: BasicResource[];
  scope: string;
  searchText: string;
  onItemClick: (identifier: number) => void;
  modules: Module[];
}

const QuickAccessView: React.FC<QuickAccessViewProps> = ({
  resources,
  scope,
  searchText,
  onItemClick,
  modules,
}) => {
  let quickAccessItems: BasicResource[] = JSON.parse(JSON.stringify(resources));
  quickAccessItems = quickAccessItems.filter((item) => {
    return modules.some(({ code, title }) => {
      const moduleCode = code.startsWith("CO") ? code.slice(2) : code;
      const [paperCode, paperTitle] = item.title.split(": ");
      return (
        paperCode === moduleCode ||
        paperCode === `C${moduleCode}` ||
        paperTitle === title
      );
    });
  });
  quickAccessItems.reverse();
  quickAccessItems.forEach((i) => i.tags.push(i.folder));
  if (searchText === "" && scope === "" && quickAccessItems.length > 0) {
    return (
      <SelectionView
        heading="Quick Access"
        onItemClick={onItemClick}
        onDownloadClick={() => {}}
        disableSelection={true}
        selectionItems={quickAccessItems}
        render={(select: SelectionProps) => <QuickAccessRow select={select} />}
      />
    );
  }
  return null;
};

export default QuickAccessView;
