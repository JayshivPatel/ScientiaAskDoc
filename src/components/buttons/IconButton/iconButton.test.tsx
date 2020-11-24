import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import IconButton from "./index";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/cjs/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

configure({ adapter: new Adapter() });

describe("<IconButton />", () => {
  const onClick = jest.fn();
  const iconDefinition = faFileCode;
  const wrapper = mount(
    <IconButton
      tooltip={"Test Button"}
      onClick={onClick}
      icon={iconDefinition}
    />
  );
  it("Check circular style", () => {
    expect(wrapper.find(Button).hasClass("sectionHeaderButton")).toBe(true);
    wrapper.setProps({ circular: true }).update();
    expect(wrapper.find(Button).hasClass("circularButton")).toBe(true);
  });
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(iconDefinition);
  });
  it("Click on icon is handled", () => {
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
