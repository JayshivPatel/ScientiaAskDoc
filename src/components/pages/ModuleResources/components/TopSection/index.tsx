import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";

export interface TopSectionProps {
  onViewButtonClick: (event: React.MouseEvent) => void;
  currentView: string;
  scope: string;
}

const TopSection: React.FC<TopSectionProps> = ({
  onViewButtonClick,
  currentView,
  scope,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
				marginTop: scope === "" ? "-0.375rem" : "0",
        marginBottom: scope === "" ? "-0.375rem" : "0",
      }}
    >
      <MyBreadcrumbs />

      {scope === "" ? (
        <Button
          className={styles.viewToggleButton}
          onClick={onViewButtonClick}
          variant="secondary"
        >
          <FontAwesomeIcon
            icon={currentView === "folder" ? faBorderAll : faList}
          />
        </Button>
      ) : null}
    </div>
  );
};

export default TopSection;
