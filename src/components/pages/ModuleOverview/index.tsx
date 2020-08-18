import React from "react";
import Dandruff from "components/molecules/Dandruff";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLink } from "@fortawesome/free-solid-svg-icons";

const ModuleOverview: React.FC = () => {
  let { id } = useParams();
  let moduleCode = id.startsWith("CO") ? id.slice(2) : id;
  const buttons = [
    {
      title: "College Website",
      icon: faGlobe,
      url: `https://www.imperial.ac.uk/computing/current-students/courses/${moduleCode}/`,
    },
    {
      title: "Materials Link 1",
      icon: faLink,
      url: `https://www.doc.ic.ac.uk/~wl/teachlocal/arch/`,
    },
    {
      title: "Materials Link 2",
      icon: faLink,
      url: "http://wp.doc.ic.ac.uk/bkainz/teaching/co112-hardware/",
    },
  ];

  let modules = [
    {
      title: "Introduction to Logic",
      code: "CO140",
    },
    {
      title: "Discrete Mathematics",
      code: "CO142",
    },
    {
      title: "Introduction to Computer Systems",
      code: "CO112",
    },
    {
      title: "Mathematical Methods",
      code: "CO145",
    },
    {
      title: "Java",
      code: "CO120.2",
    },
    {
      title: "Graphs and Algorithms",
      code: "CO150",
    },
    {
      title: "Introduction to Computer Architecture",
      code: "CO113",
    },
    {
      title: "Reasoning About Programs",
      code: "CO141",
    },
    {
      title: "Introduction to Databases",
      code: "CO130",
    },
  ];
  let heading = id;
  for (let i in modules) {
    if (modules[i].code === id) {
      heading = modules[i].title;
      break;
    }
  }
  return (
    <>
      <Dandruff heading={heading} />

      <h4 className={classNames(styles.moduleSectionHeader)}>Description</h4>
      <p>
        Since students don't need to see the full course information everytime
        they click open a module, instead of making a copy of the college
        website here in Scientia, we could add links to the relavant site below,
        and only fetch or generate a short description to place here. The rest
        of this page could be used for something useful like Sudar's timeline
        idea and links to lecture's websites (which we could fetch from the
        links they provided in materials).
      </p>

      <h4 className={classNames(styles.moduleSectionHeader)}>Links</h4>
      <Row style={{ marginTop: "1.25rem" }}>
        {buttons.map(({ title, icon, url }, i) => (
          <Col
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            key={i}
            style={{ paddingRight: "10px", paddingLeft: "10px" }}
          >
            <Button href={url} target="_blank">
              {title}
              <FontAwesomeIcon style={{ fontSize: "1.125rem" }} icon={icon} />
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ModuleOverview;
