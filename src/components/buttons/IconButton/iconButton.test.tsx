import React from "react";
import { mount, shallow } from "enzyme";
import IconButton from "./index";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/cjs/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

describe("<IconButton />", () => {
  const tooltip = "Test Tooltip";
  const onClick = jest.fn();
  const icon = faFileCode;
  const wrapper = mount(
    <IconButton tooltip={tooltip} onClick={onClick} icon={icon} />
  );
  it("Check tooltip", () => {
    const overlay = wrapper.find(OverlayTrigger).prop("overlay");
    expect(shallow(<div>{overlay}</div>).text()).toBe(tooltip);
  });
  it("Check button onClick", () => {
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon);
  });
  it("Check circular style", () => {
    expect(wrapper.find(Button).hasClass("sectionHeaderButton")).toBe(true);
    wrapper.setProps({ circular: true }).update();
    expect(wrapper.find(Button).hasClass("circularButton")).toBe(true);
  });
  it("Check theme", () => {
    expect(wrapper.find(Button).hasClass("white")).toBe(false);
    wrapper.setProps({ theme: "white" }).update();
    expect(wrapper.find(Button).hasClass("white")).toBe(true);
  });
  it("Check hover theme", () => {
    expect(wrapper.find(Button).hasClass("warningHover")).toBe(false);
    wrapper.setProps({ hoverTheme: "warning" }).update();
    expect(wrapper.find(Button).hasClass("warningHover")).toBe(true);
  });
});
