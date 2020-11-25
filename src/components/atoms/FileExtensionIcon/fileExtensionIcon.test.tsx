import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faFile,
  faFileAlt,
  faFileCode,
  faFilePowerpoint,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import FileExtensionIcon from ".";

configure({ adapter: new Adapter() });

describe("<FileExtensionIcon />", () => {
  it("Check able to recognize file extensions", () => {
    const codeDics = [
      [["hs"], faFileCode],
      [["hs", "lhs"], faFileCode],
      [["c", "cpp"], faFileCode],
      [["rar"], faArchive],
      [["pptx"], faFilePowerpoint],
      [["docx"], faFileWord],
      [["txt"], faFileAlt],
      [[""], faFileAlt],
      [["c", "zip"], faFile],
      [[], faFile],
    ];
    const wrapper = mount(<FileExtensionIcon suffixes={[]} />);
    for (const [suffixes, icon] of codeDics) {
      wrapper.setProps({ suffixes: suffixes }).update();
      expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon);
    }
  });
  it("Check clickings on icon is handled", () => {
    const wrapper = mount(<FileExtensionIcon suffixes={[]} />);
    const onClick = jest.fn();
    wrapper.setProps({ onClick: onClick }).update();
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
