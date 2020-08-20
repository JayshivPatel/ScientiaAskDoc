import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";

export interface TopSectionProps {
  onViewButtonClick: (event: React.MouseEvent) => void;
  currentView: string;
}

const TopSection: React.FC<TopSectionProps> = ({
  onViewButtonClick,
  currentView,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
				alignItems: "center",
				marginTop: "-0.375rem"
      }}
    >
      <MyBreadcrumbs />
      <Button
        className={styles.viewToggleButton}
        onClick={onViewButtonClick}
        variant="secondary"
      >
        <FontAwesomeIcon
          icon={currentView === "folder" ? faBorderAll : faList}
        />
      </Button>
    </div>
  );
};

export default TopSection;
