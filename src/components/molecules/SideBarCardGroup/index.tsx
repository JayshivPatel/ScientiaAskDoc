import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import SideBarCard, { SideBarCardProps } from "components/atoms/SideBarCard";

export interface SideBarCardGroupProps {
  events: SideBarCardProps[];
  title: string;
  onCardClick?: (id?: number) => void;
}

const SideBarCardGroup: React.FC<SideBarCardGroupProps> = ({
  events,
  title,
  onCardClick,
}: SideBarCardGroupProps) => {
  return (
    <div>
      <h1 className={styles.sideBarCardGroupHeading}>{title}</h1>
      <div
        className={classNames("btn-group-vertical", styles.sideBarCardGroup)}
        role="group"
      >
        {events.map(({ type, title, subtitle, content, id }) => (
          <SideBarCard
            title={title}
            type={type}
            onClick={onCardClick ? (e) => onCardClick(id) : () => {}}
            subtitle={subtitle}
            content={content}
            key={id ? id : "" + title + type + subtitle}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBarCardGroup;
