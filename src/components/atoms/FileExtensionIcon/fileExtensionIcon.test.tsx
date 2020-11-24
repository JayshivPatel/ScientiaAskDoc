import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileAlt,
  faArchive,
  faFileCode,
  faFilePowerpoint,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import FileExtensionIcon from ".";

configure({ adapter: new Adapter() });

describe("renders learn react link", () => {
  it("Able to recognize file extensions", () => {
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
      const onClick = jest.fn();
      wrapper.setProps({ suffixes: suffixes, onClick: onClick }).update();
      expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon);
      wrapper.simulate("click");
      expect(onClick).toHaveBeenCalled();
    }
  });
});
