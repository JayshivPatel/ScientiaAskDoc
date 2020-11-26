import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PersonInfo } from "../../../constants/types";
import PersonCard from "./index";

configure({ adapter: new Adapter() });

describe("<PersonCard />", () => {
  const info: PersonInfo = {
    name: "Test Name",
    email: "Test Email",
    id: "Test id",
    cid: "Test cid",
    dep: "Test Dep",
    extra: { kind: "student", year: "Test Year", course: "Test Course" },
  };
  const wrapper = mount(<PersonCard info={info} />);
  it("Test student", () => {
    expect(wrapper.find(".userName").text()).toBe(info.name);
    expect(wrapper.find(".userEmail").text()).toBe(info.email);
    expect(wrapper.find(".userDepartment").text()).toBe(info.dep);
    if (info.extra.kind !== "staff") {
      expect(wrapper.find(".userYear").text()).toBe(info.extra.year + ",");
    }
    if (info.extra.kind !== "staff") {
      expect(wrapper.find(".userCourse").at(0).text()).toBe(info.extra.course);
    }
  });
});
