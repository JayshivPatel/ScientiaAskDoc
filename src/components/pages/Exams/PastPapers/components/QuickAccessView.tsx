import React from "react";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import QuickAccessRow from "components/molecules/QuickAccessRow";
import { BasicResource } from "constants/types";
import { modulesList } from "components/pages/ModuleList/list";

export interface QuickAccessViewProps {
  resources: BasicResource[];
  scope: string;
  searchText: string;
  onItemClick: (identifier: number) => void;
  lastYear: string;
}

const QuickAccessView: React.FC<QuickAccessViewProps> = ({
  resources,
  scope,
  searchText,
  onItemClick,
  lastYear,
}) => {
  let quickAccessItems = resources
    .filter(({ folder }) => folder === lastYear)
    .filter(({ title }) => {
      return modulesList.some(({ code }) => {
        const moduleCode = code.startsWith("CO") ? code.slice(2) : code;
        return title.startsWith(`C${moduleCode}`);
      });
    });

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
