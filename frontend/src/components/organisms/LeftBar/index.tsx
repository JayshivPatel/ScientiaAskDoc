import React from "react";
import LeftBarTabGroup from "components/molecules/LeftBarTabGroup";

const LeftBar: React.FC = () => {
  return (
    <div id="sidebar-wrapper">
      <p className="sidebar-status">1 UPDATE</p>

      <LeftBarTabGroup />
    </div>
  );
};

export default LeftBar;
