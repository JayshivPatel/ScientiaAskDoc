import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import styles from "./style.module.scss";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { Link } from "react-router-dom";

const MyBreadcrumbs = withBreadcrumbs()(
  ({ breadcrumbs }: { breadcrumbs: any }) => (
    <Breadcrumb className={styles.breadcrumb}>
      {breadcrumbs.map(
        ({ match, breadcrumb }: { match: any; breadcrumb: any }) => (
          <Breadcrumb.Item
            key={match.url}
            className={styles.breadcrumbItem}
            linkAs={Link}
            linkProps={{ to: match.url }}
          >
            {breadcrumb}
          </Breadcrumb.Item>
        )
      )}
    </Breadcrumb>
  )
);

export default MyBreadcrumbs;
