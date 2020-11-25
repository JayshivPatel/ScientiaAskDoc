import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FolderCard from "./index";

configure({ adapter: new Adapter() });

describe("<FolderCard />", () => {
  const title = "Test Title";
  const icon = faFileCode;
  const onIconClick = jest.fn();
  const onClick = jest.fn();
  const onMouseOver = jest.fn();
  const onMouseOut = jest.fn();
  const wrapper = mount(
    <FolderCard
      title={title}
      icon={icon}
      onIconClick={onIconClick}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
  it("Check title", () => {
    expect(wrapper.text()).toBe(title);
  });

  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon);
  });
  it("Check icon onClick", () => {
    onIconClick.mockClear();
    onClick.mockClear();
    wrapper.find(FontAwesomeIcon).simulate("click");
    expect(onIconClick).toHaveBeenCalled();
  });
  it("Check card onClick", () => {
    onIconClick.mockClear();
    onClick.mockClear();
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
    expect(onIconClick).not.toHaveBeenCalled();
  });
  it("Check mouse over", () => {
    wrapper.simulate("mouseover");
    expect(onMouseOver).toHaveBeenCalled();
  });
  it("Check mouse out", () => {
    wrapper.simulate("mouseout");
    expect(onMouseOut).toHaveBeenCalled();
  });
});
