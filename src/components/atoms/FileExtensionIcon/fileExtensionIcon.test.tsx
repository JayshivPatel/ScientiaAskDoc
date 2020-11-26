import React from "react";
import { mount } from "enzyme";
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
  it("Check icon onClick", () => {
    const wrapper = mount(<FileExtensionIcon suffixes={[]} />);
    const onClick = jest.fn();
    wrapper.setProps({ onClick: onClick }).update();
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
