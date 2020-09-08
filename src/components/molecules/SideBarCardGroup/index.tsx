import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import SideBarCard, { SideBarCardProps } from "components/atoms/SideBarCard";

export interface SideBarCardGroupProps {
  events: SideBarCardProps[];
  title: string;
}

const SideBarCardGroup: React.FC<SideBarCardGroupProps> = ({
  events,
  title
}: SideBarCardGroupProps) => {
  return (
    <>
      <h1 className={styles.sideBarCardGroupHeading}>{title}</h1>
      <div
        className={classNames("btn-group-vertical", styles.sideBarCardGroup)}
        role="group"
      >
        {events.map(({ type, title, subtitle, content }) => (
          <SideBarCard
            title={title}
            type={type}
            subtitle={subtitle}
            content={content}
            key={"" + title + type + subtitle}
          />
        ))}
      </div>
    </>
  );
};

export default SideBarCardGroup;
