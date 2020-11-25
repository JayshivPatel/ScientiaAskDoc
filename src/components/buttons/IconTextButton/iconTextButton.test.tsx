import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconTextButton from "./index";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

configure({ adapter: new Adapter() });

describe("<IconTexxtButton />", () => {
  const icon = faFileCode;
  const text = "Test";
  const tooltip = "Test Tooltip";
  const onClick = jest.fn();
  const wrapper = mount(
    <IconTextButton
      icon={icon}
      text={text}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon);
  });
  it("Check text", () => {
    expect(wrapper.text()).toBe(text);
  });
  it("Check tooltip", () => {
    const overlay = wrapper.find(OverlayTrigger).prop("overlay");
    expect(shallow(<div>{overlay}</div>).text()).toBe(tooltip);
  });
  it("Check button onClick", () => {
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
