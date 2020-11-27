import React from "react";
import { mount } from "enzyme";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import SideBarTabGroup from "./index";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

describe("<SideBarTabGroup />", () => {
  const title = "Test Title";
  const buttons = [
    { title: "Test Button Title", icon: faFileCode, onClick: jest.fn() },
  ];
  const wrapper = mount(<SideBarTabGroup title={title} buttons={buttons} />);
  it("Check title", () => {
    expect(wrapper.find(".tabGroupHeading").text()).toBe(title);
  });
  it("Check buttons", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).text()).toBe(buttons[0].title);
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(buttons[0].icon);
    buttons[0].onClick.mockClear();
    wrapper.find(Button).simulate("click");
    expect(buttons[0].onClick).toHaveBeenCalled();
  });
});
