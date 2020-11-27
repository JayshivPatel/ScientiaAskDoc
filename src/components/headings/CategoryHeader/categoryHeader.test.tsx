import React from "react";
import { mount } from "enzyme";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import CategoryHeader from "./index";

describe("<Category Header", () => {
  const heading = "Test Heading";
  const onSelectAllClick = jest.fn();
  const selectAllIcon = faFileCode;
  const wrapper = mount(
    <CategoryHeader
      heading={heading}
      onSelectAllClick={onSelectAllClick}
      selectAllIcon={selectAllIcon}
    />
  );
  it('pass', () => {})

});
