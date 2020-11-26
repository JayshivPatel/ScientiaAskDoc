import {render} from "@testing-library/react"
import React from "react";
import SubmissionSection from "./index";
import {
  DeclarationInfo,
  DeclarationStatus,
  EventRole,
  ResourceUploadRequirement,
  TimelineEvent
} from "../../../constants/types";
import moment from "moment";
import {mount} from "enzyme";
import UploadResourceItemRow from "../../rows/UploadResourceItemRow";
import mockAPI from "../../../utils/mockApi";
import {api, methods} from "../../../constants/routes";
import authenticationService from "utils/auth"
import GroupMemberCard from "../../cards/GroupMemberCard";
import LoadingScreen from "../../suspense/LoadingScreen";

const flushPromises = () => new Promise(setImmediate)

beforeEach(() => {
  mockAPI.clearTestCache()
})

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

describe("SubmissionSectionGeneral", () => {
  const courseCode = "60021"
  const exerciseNumber = 1
  const username = authenticationService.getUserInfo()["username"]

  const eventIndividual: TimelineEvent = {
    title: "Checkpoint 3",
    id: exerciseNumber,
    prefix: "CW",
    assessment: "assessed",
    status: "due",
    owner: "Ivan Procaccini",
    role: EventRole.STUDENT,
    moduleCode: courseCode,
    startDate: moment().toDate(),
    endDate: moment().add(5, "days").toDate(),
  }

  const eventGroup: TimelineEvent = {
    title: "Checkpoint 3",
    id: exerciseNumber,
    prefix: "CW",
    assessment: "group",
    status: "due",
    owner: "Ivan Procaccini",
    role: EventRole.STUDENT,
    moduleCode: courseCode,
    startDate: moment().toDate(),
    endDate: moment().add(5, "days").toDate(),
  }

  const groupData: { id: string, members: { [attr: string]: string }[] } = {
    id: "1",
    members: [{
      username: "yz31218",
      firstname: "Yvette",
      lastname: "Dubois",
      class: "c3",
      role: "leader",
      signature: "2020-11-16 08:00:00"
    }]
  }

  const availableMembers: { [k: string]: { [attr: string]: string } } = {
    "rh5718": {
      "username": "rh5718",
      "firstname": "Ruoyu",
      "lastname": "Hu",
      "cohort": "c3",
      "year": "2021"
    },
    "ppc2318": {
      "username": "ppc2318",
      "firstname": "Patrick",
      "lastname": "Chen",
      "cohort": "c3",
      "year": "2021"
    },
  }

  const fileRequirements: { requirements: ResourceUploadRequirement[] } = {
    requirements:  [
      {id: 0, title: 'foobar', maxSize: 26214400, allowedSuffixes: ['pdf']},
      {id: 1, title: 'ex1', maxSize: 32, allowedSuffixes: ['hs', 'lhs']}
    ]
  }

  const declaration: DeclarationInfo = {
    id: 1,
    status: DeclarationStatus.UNAIDED,
    exercise: exerciseNumber.toString(),
    course: courseCode,
    helpers: [],
    timestamp: moment().toDate().toString(),
    username: username
  }
  beforeEach(() => {
    mockAPI.clearTestCache()
  })

  it("Will display error when failed to retrieve data", async done => {
    const component = <SubmissionSection
      event={eventGroup}
      activeDay={new Date()}
      courseCode={courseCode}
      exerciseNumber={exerciseNumber}
    />
    const wrapper = mount(component)
    await flushPromises()
    wrapper.update()
    expect(wrapper.find(UploadResourceItemRow)).toHaveLength(0)
    expect(wrapper.find(GroupMemberCard)).toHaveLength(0)
    expect(wrapper.find(LoadingScreen)).toHaveLength(1)
    expect(wrapper.text().includes("The server just put me on hold!")).toBeTruthy()
    done()
  })


  it("can render section for individual coursework submission", async done => {
    const component = <SubmissionSection
      event={eventIndividual}
      activeDay={new Date()}
      courseCode={courseCode}
      exerciseNumber={exerciseNumber}
    />

    mockAPI.onNextCallTo(
      api.CATE_FILE_UPLOAD(courseCode, exerciseNumber, username),
    ).withMethod(methods.GET).willReturn(fileRequirements, 200)

    mockAPI.onNextCallTo(
      api.CATE_DECLARATION(courseCode, exerciseNumber, username)
    ).withMethod(methods.GET).willReturn(declaration, 200)

    const wrapper = mount(component)
    await flushPromises()
    wrapper.update()
    expect(wrapper.find(UploadResourceItemRow)).toHaveLength(2)
    done()
  })

  it("can render section for group coursework submission", async done => {
    const component = <SubmissionSection
      event={eventGroup}
      activeDay={new Date()}
      courseCode={courseCode}
      exerciseNumber={exerciseNumber}
    />

    mockAPI.onNextCallTo(
      api.CATE_FILE_UPLOAD(courseCode, exerciseNumber, username),
    ).withMethod(methods.GET).willReturn(fileRequirements, 200)

    mockAPI.onNextCallTo(
      api.CATE_DECLARATION(courseCode, exerciseNumber, username)
    ).withMethod(methods.GET).willReturn(declaration, 200)

    mockAPI.onNextCallTo(
      api.CATE_GROUP_SINGLE_MEMBER(courseCode, exerciseNumber, username)
    ).withMethod(methods.GET).willReturn(groupData, 200)

    mockAPI.onNextCallTo(
      api.CATE_AVAILABLE_STUDENTS_FOR_EXERCISE(courseCode, exerciseNumber)
    ).withMethod(methods.GET).willReturn(availableMembers, 200)

    const wrapper = mount(component)
    await flushPromises()
    wrapper.update()
    expect(wrapper.find(UploadResourceItemRow)).toHaveLength(2)
    expect(wrapper.find(GroupMemberCard)).toHaveLength(1)
    done()
  })

})