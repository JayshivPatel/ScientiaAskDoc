import React from "react";
import { mount } from "enzyme";
import SideBarFilterGroup from "./index";
import SideBarTabGroup from "../SideBarTabGroup";
import Button from "react-bootstrap/Button";

describe("<SideBarFilterGrou />", () => {
  const setModulesFilter = jest.fn();
  const modulesFilter = "";
  const wrapper = mount(
    <SideBarFilterGroup
      setModulesFilter={setModulesFilter}
      modulesFilter={modulesFilter}
    />
  );
  it("Check all", () => {
    expect(wrapper.find(SideBarTabGroup)).toHaveLength(1);
    expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Filter");
    expect(wrapper.find(SideBarTabGroup).prop("buttons").length).toBe(4);
  });
  it("Check button onClick", () => {
    setModulesFilter.mockClear();
    wrapper.find(Button).at(0).simulate("click");
    expect(setModulesFilter).toHaveBeenCalledTimes(1);
    wrapper.find(Button).at(1).simulate("click");
    expect(setModulesFilter).toHaveBeenCalledTimes(2);
  });
});
