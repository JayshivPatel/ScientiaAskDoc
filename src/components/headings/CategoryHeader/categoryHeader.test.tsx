import React from "react";
import { mount } from "enzyme";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import CategoryHeader from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

describe("<Category Header", () => {
  const heading = "Test Heading";
  const onSelectAllClick = jest.fn();
  const wrapper = mount(
    <CategoryHeader heading={heading} onSelectAllClick={onSelectAllClick} />
  );
  it("Check heading", () => {
    expect(wrapper.find(".sectionHeader").text()).toBe(heading);
  });
  it("Check click", () => {
    onSelectAllClick.mockClear();
    wrapper.find(".sectionHeaderContainer").simulate("click");
    expect(onSelectAllClick).toHaveBeenCalled();
  });
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon)).toHaveLength(0);
    const selectAllIcon = faFileCode;
    wrapper.setProps({ selectAllIcon: selectAllIcon });
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(selectAllIcon);
    wrapper.setProps({ checkBoxColor: "red" });
    expect(wrapper.find(FontAwesomeIcon).prop("style")).toHaveProperty(
      "color",
      "red"
    );
  });
});
