import React from "react";
import Dandruff from "components/molecules/Dandruff";
import { useParams } from "react-router-dom";

const ModuleOverview: React.FC = () => {
  let { id } = useParams();
  return (
    <>
      <Dandruff heading={id} />
    </>
  );
};

export default ModuleOverview;
