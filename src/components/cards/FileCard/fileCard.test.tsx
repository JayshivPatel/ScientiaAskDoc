import React from "react";
import { mount } from "enzyme";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import FileCard from "./index";
import Badge from "react-bootstrap/Badge";

describe("<FileCard />", () => {
  const title = "Test Title";
  const type = "";
  const tag0 = "Test Tag a";
  const tag1 = "Test Tag b";
  const tags = [tag0, tag1];
  const icon = faFileCode;
  const onIconClick = jest.fn();
  const onClick = jest.fn();
  const onMouseOver = jest.fn();
  const onMouseOut = jest.fn();
  const wrapper = mount(
    <FileCard
      title={title}
      type={type}
      tags={tags}
      icon={icon}
      onIconClick={onIconClick}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
  it("Check title", () => {
    expect(wrapper.find(Card.Title).text()).toBe(title);
  });
  it("Check tags", () => {
    expect(wrapper.find(Badge).at(0).text()).toBe(tag0);
    expect(wrapper.find(Badge).at(1).text()).toBe(tag1);
  });
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon);
  });
  it("Check icon onClick", () => {
    onIconClick.mockClear();
    onClick.mockClear();
    wrapper.find(FontAwesomeIcon).simulate("click");
    expect(onIconClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
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
