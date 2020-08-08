import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

export interface DandruffProps {
  heading: string;
}

export enum eventTypes {
  Lecture = "Lecture",
  Labs = "Labs",
  Deadline = "Deadline",
}

const Dandruff: React.FC<DandruffProps> = ({ heading }: DandruffProps) => {
  return (
    <>
      <MyBreadcrumbs />

      <h3>{heading}</h3>
      <hr />
    </>
  );
};

export default Dandruff;
