import React from "react";
import styles from "./style.module.scss";

import { request } from "../../../utils/api";
import { api, methods } from "../../../constants/routes";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import FileListItem from "components/atoms/FileListItem";
import {
  resourceTypeToIcon,
  Resource,
  openResource,
  tags,
} from "../../pages/ModuleResources";
import LoadingScreen from "components/molecules/LoadingScreen";
import { titleCase } from "utils/functions";

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
    this.setState({ isLoaded: false });
    const onSuccess = (data: { json: () => Promise<any> }) => {
      let resourceArr: Resource[] = [];

      data.json().then((json) => {
        for (const key in json) {
          let resource = json[key];
          resourceArr.push({
            title: resource.title,
            type: resource.type,
            tags: resource.tags,
            folder: resource.category,
            id: resource.id,
            path: resource.path,
          } as Resource);
        }
        this.setState({ resources: resourceArr, isLoaded: true });
      });
    };
    const onFailure = (error: { text: () => Promise<any> }) => {
      if (error.text) {
        error.text().then((errorText) => {
          this.setState({ error: errorText, isLoaded: true });
        });
      }
    };

    request(api.MATERIALS_RESOURCES, methods.GET, onSuccess, onFailure, {
      year: this.props.year,
      course: this.moduleCode,
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
                  .map(({ title, type, tags, id }: any) => (
                    <FileListItem
                      title={title}
                      tags={tags.filter(
                        (tag: string) => !tag.toLowerCase().startsWith("week")
                      )}
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
