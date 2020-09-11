import React from "react";
import MyBreadcrumbs from "components/headings/MyBreadcrumbs";

export interface DandruffProps {
  heading: string;
}

const Dandruff: React.FC<DandruffProps> = ({ heading }: DandruffProps) => {
  return (
    <>
      <MyBreadcrumbs />

      <div style={{ borderBottom: "1px solid var(--border-color)"}}>
        <h3 style={{ color: "var(--primary-text-color)"}}>{heading}</h3>
      </div>
    </>
  );
};

export default Dandruff;
