import React, { useEffect, useState } from "react";
import Dandruff from "components/molecules/Dandruff";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";
import classNames from "classnames";
import { faGlobe, faLink } from "@fortawesome/free-solid-svg-icons";
import PageButtonGroup from "components/molecules/PageButtonGroup";
import { request } from "../../../utils/api";
import { api, methods } from "../../../constants/routes";

const ModuleOverview: React.FC = () => {
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
      <PageButtonGroup buttons={buttons} style={{ marginTop: "1.25rem" }} />
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

export default ModuleOverview;
