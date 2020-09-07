import React, { useEffect, useState } from "react";
import Dandruff from "components/molecules/Dandruff";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";
import classNames from "classnames";
import { faGlobe, faLink } from "@fortawesome/free-solid-svg-icons";
import PageButtonGroup from "components/molecules/PageButtonGroup";

import { request } from "utils/api";
import { api, methods } from "constants/routes";

import tutorImage1 from "assets/images/tutor-1.png";
import tutorImage2 from "assets/images/tutor-2.png";

import TutorCardGroup from "components/molecules/TutorCardGroup";

const ModuleDashboard: React.FC = () => {
  let { id } = useParams();
  let moduleCode = id.startsWith("CO") ? id.slice(2) : id;
  const initialButtons = [
    {
      title: "College Website",
      icon: faGlobe,
      url: `https://www.imperial.ac.uk/computing/current-students/courses/${moduleCode}/`,
    },
  ];
  let [buttons, setButtons] = useState(initialButtons);

  useEffect(() => {
    const onSuccess = (data: { json: () => Promise<any> }) => {
      let newButtons: any[] = [];

      data.json().then((json) => {
        for (const key in json) {
          let resource = json[key];
          if (resource.type !== "link") continue;

          newButtons.push({
            title: resource.title,
            icon: faLink,
            url: resource.path,
          });
        }
        setButtons((b) => b.concat(newButtons));
      });
    };
    request(
      api.MATERIALS_RESOURCES,
      methods.GET,
      onSuccess,
      () => {
        console.log("fail");
      },
      {
        year: "2021",
        course: moduleCode,
      }
    );
  }, [moduleCode]);

  return (
    <>
      <Dandruff heading={generateHeading(id)} />

      <h4 className={classNames(styles.moduleSectionHeader)}>Module Aims</h4>
      <div className={styles.moduleDashboardText} style={{ paddingTop: "0.75rem" }}>
        <span>In this module you will have the opportunity to:</span>
        <ul>
          <li>
            Learn about language and semantics of propositional and first-order
            logic
          </li>
          <li>
            Explore the user of logic for modelling rigorously human reasoning
          </li>
          <li>
            Apply various semantic methods for proving validity of arguments and
            logical equivalences
          </li>
          <li>
            Study natural deduction and resolution for constructing correct
            proofs
          </li>
          <li>Investigate soundness and completeness of natural deduction</li>
          <li>Apply first-order logic to program specification</li>
        </ul>
      </div>

      <h4 className={classNames(styles.moduleSectionHeader)}>Links</h4>
      <PageButtonGroup buttons={buttons} style={{ marginTop: "1.25rem" }} />

      <div className={classNames(styles.moduleSectionHeader)}>
        <TutorCardGroup title="Module Leaders" tutors={leaders} />
      </div>
    </>
  );
};

function generateHeading(id: string) {
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
  return heading;
}

export default ModuleDashboard;

const leaders: {
  name: string;
  email: string;
  address: string;
  image: string;
}[] = [
  {
    name: "Dr. Zahid Barr",
    email: "zahid.barr@imperial.ac.uk",
    address: "373, Huxley Building",
    image: tutorImage1,
  },
  {
    name: "Dr. Rosalind Baker",
    email: "rosalind.baker@imperial.ac.uk",
    address: "590, Huxley Building",
    image: tutorImage2,
  },
];
