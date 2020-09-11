import React from "react";
import styles from "./style.module.scss";

import { request } from "utils/api";
import { api, methods } from "constants/routes";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import MyBreadcrumbs from "components/headings/MyBreadcrumbs";
import queryString from "query-string";
import FileItemRow from "components/rows/FileItemRow";
import {
  resourceTypeToIcon,
  openResource,
  tags,
} from "../ModuleResources/utils";
import LoadingScreen from "components/suspense/LoadingScreen";
import { titleCase } from "utils/functions";
import { Resource } from "constants/types";

export interface ModuleOverviewProps {
  year: string;
  moduleID: string;
}

export interface ModuleOverviewState {
  error: any;
  isLoaded: Boolean;
  resources: Resource[];
}

class ModuleOverview extends React.Component<
  ModuleOverviewProps,
  ModuleOverviewState
> {
  moduleCode = this.props.moduleID.startsWith("CO")
    ? this.props.moduleID.slice(2)
    : this.props.moduleID;

  constructor(props: ModuleOverviewProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      resources: [],
    };
  }

  componentDidMount() {
    this.loadResources();
  }

  componentDidUpdate(prevProps: ModuleOverviewProps) {
    if (prevProps.year !== this.props.year) {
      this.loadResources();
    }
  }

  loadResources() {
    this.setState({ isLoaded: false });

    const onSuccess = (data: { [k: string]: any }) => {
      let resourceArr: Resource[] = [];
      for (const key in data) {
        let resource = data[key];

        let resourceURL = queryString.parseUrl(resource.path);
        let extension = resource.path.substr(
          resource.path.lastIndexOf(".") + 1
        );
        let altType = undefined;
        if (
          resourceURL.url ===
          "https://imperial.cloud.panopto.eu/Panopto/Pages/Viewer.aspx"
        ) {
          altType = "video";
        } else if (extension === "pdf") {
          altType = "pdf";
        }

        resourceArr.push({
          title: resource.title,
          type: altType || resource.type,
          tags: resource.tags,
          folder: resource.category,
          id: resource.id,
          downloads: resource.downloads,
          path: resource.path,
        } as Resource);
      }
      this.setState({ resources: resourceArr, isLoaded: true });
    };

    const onError = (message: string) => {
      this.setState({ error: message, isLoaded: true });
    };

    request({
      url: api.MATERIALS_RESOURCES,
      method: methods.GET,
      onSuccess,
      onError,
      body: {
        year: this.props.year,
        course: this.moduleCode,
      },
    });
  }

  handleResourceClick(id: number) {
    openResource(this.state.resources, id);
  }

  render() {
    let allAvailableWeeks = tags(this.state.resources)
      .map((t) => t.toLowerCase())
      .filter((t) => t.startsWith("week"));

    return (
      <>
        <MyBreadcrumbs />

        <LoadingScreen
          error={this.state.error}
          isLoaded={this.state.isLoaded}
          successful={
            <Accordion
              defaultActiveKey="week 2"
              style={{ marginTop: "1.25rem", borderRadius: ".5rem" }}
              className={styles.progressAccordion}
            >
              {allAvailableWeeks.map((weekTitle) => {
                const WeekList = this.state.resources
                  .filter(({ tags }: any) =>
                    tags.some((tag: string) => tag.toLowerCase() === weekTitle)
                  )
                  .map(({ title, type, tags, id, downloads }: any) => (
                    <FileItemRow
                      title={title}
                      tags={tags.filter(
                        (tag: string) => !tag.toLowerCase().startsWith("week")
                      )}
                      downloads={downloads}
                      icon={resourceTypeToIcon(type)}
                      onClick={() => this.handleResourceClick(id)}
                      key={id}
                    />
                  ));

                return (
                  <Card className={styles.weekCard} key={weekTitle}>
                    <Accordion.Toggle
                      className={styles.weekCardHeader}
                      as={Card.Header}
                      eventKey={weekTitle}
                    >
                      {titleCase(weekTitle)}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={weekTitle}>
                      <Card.Body className={styles.weekCardBody}>
                        {WeekList}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </Accordion>
          }
        />
      </>
    );
  }
}

export default ModuleOverview;
