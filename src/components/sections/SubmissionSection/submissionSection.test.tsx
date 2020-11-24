import {render, waitFor} from "@testing-library/react"
import React from "react";
import SubmissionSection from "./index";
import {EventRole, ResourceUploadRequirement, TimelineEvent} from "../../../constants/types";
import moment from "moment";
import Adapter from 'enzyme-adapter-react-16'
import {configure, mount, ReactWrapper, shallow} from "enzyme";
import UploadResourceItemRow from "../../rows/UploadResourceItemRow";
import mockAPI from "../../../utils/mockApi";
import {api, methods} from "../../../constants/routes";
import authenticationService from "utils/auth"

configure({adapter: new Adapter()})

const flushPromises = () => new Promise(setImmediate)

describe("SubmissionSectionSync", () => {
  it("Able to render the submission section", () => {
    const {} = render(
      <SubmissionSection
        event={undefined}
        activeDay={new Date()}
        courseCode={"60021"}
        exerciseNumber={1}
      />
    )
  })
})

describe("SubmissionSectionIndividualCoursework", () => {
  const CW_EVENT: TimelineEvent = {
    title: "Checkpoint 3",
    id: 4,
    prefix: "CW",
    assessment: "assessed",
    status: "due",
    owner: "Ivan Procaccini",
    role: EventRole.STUDENT,
    moduleCode: "60021",
    startDate: moment().toDate(),
    endDate: moment().add(5, "days").toDate(),
  }

  it("Can retrieve required files from API", async done => {
    const response: { requirements: ResourceUploadRequirement[] } = {
      requirements:  [
        {id: 0, title: 'foobar', maxSize: 26214400, allowedSuffixes: ['pdf']},
        {id: 1, title: 'ex1', maxSize: 32, allowedSuffixes: ['hs', 'lhs']}
      ]
    }

    const wrapper = <SubmissionSection
      event={CW_EVENT}
      activeDay={new Date()}
      courseCode={"60021"}
      exerciseNumber={1}
    />

    const courseCode = "60021"
    const exerciseNumber = 1
    const username = authenticationService.getUserInfo()["username"]

    mockAPI.onNextCallTo(
      api.CATE_FILE_UPLOAD(courseCode, exerciseNumber, username),
    ).withMethod(methods.GET).willReturn(response, 200)

    const component = mount(wrapper)
    await flushPromises()
    component.update()
    console.log(component.debug())
    expect(component.find(UploadResourceItemRow)).toHaveLength(2)
    done()
  })
})