import React from "react";
import { mount } from "enzyme";
import GroupMemberCard from "./index";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Role } from "../../sections/SubmissionGroupFormation";

describe("<GroupMemberCard />", () => {
  const currentUser = "Test Current User";
  const currentRole = "Test Current Role";
  const userName = "Test Username";
  const realName = "Test Real Name";
  const classEnrolled = "Test Class Enrolled";
  const role = "Test Role";
  const signatureTime = undefined;
  const onRemoveButtonClick = jest.fn();
  const onClick = jest.fn();
  const wrapper = mount(
    <GroupMemberCard
      username={userName}
      realName={realName}
      classEnrolled={classEnrolled}
      role={role}
      signatureTime={signatureTime}
      currentUser={currentUser}
      currentRole={currentRole}
      onRemoveButtonClick={onRemoveButtonClick}
      onClick={onClick}
    />
  );
  it("Check badge text", () => {
    const text = wrapper.find(Badge).text();
    expect(wrapper.find(Badge).text()).toBe("Not Signed");
    wrapper
      .setProps({ username: currentUser, currentRole: Role.MEMBER })
      .update();
    expect(wrapper.find(Badge).text()).toBe("Click Here to Sign");
    wrapper.setProps({ signatureTime: new Date() }).update();
    expect(wrapper.find(Badge).text()).toBe("SIGNED");
  });
  it("Check remove button onClick", () => {
    onClick.mockClear();
    onRemoveButtonClick.mockClear();
    wrapper.find(Button).simulate("click");
    expect(onRemoveButtonClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
  it("Check card onClick", () => {
    onClick.mockClear();
    onRemoveButtonClick.mockClear();
    wrapper.find(Container).simulate("click");
    expect(onClick).toHaveBeenCalled();
    expect(onRemoveButtonClick).not.toHaveBeenCalled();
  });
});
