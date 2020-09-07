import React from "react";
import Dandruff from "components/molecules/Dandruff";
import CalendarGroup from "components/molecules/CalendarGroup";

interface Props {
	moduleID: string;
}
const ModuleSubmissions: React.FC<Props> = ({moduleID}) => {

  let moduleCode = moduleID.startsWith("CO") ? moduleID.slice(2) : moduleID;

  return (
    <>
      <Dandruff heading="Submissions" />
			<span>Something that looks like the cards in timeline view (maybe grouped by week like overview)? </span>
    </>
  );
};

export default ModuleSubmissions;