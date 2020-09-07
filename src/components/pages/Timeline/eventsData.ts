import { TimelineEvent } from "constants/types";


export const eventsData : TimelineEvent[] = [
	{
		title: "Syntax and Semantics of Propositional Logic",
		id: 0,
		startDate: new Date("2020-10-07"),
		endDate: new Date("2020-10-07"),
		prefix: "PMT",
		assessment: "individual assessed",
		owner: "ip914",
		status: "missed",
		moduleCode: "CO140"
	},
	{
		title: "Introduction to First Order Logic",
		id: 1,
		startDate: new Date("2020-10-13"),
		endDate: new Date("2020-10-20"),
		moduleCode: "CO140",
		prefix: "PMT",
		owner: "ip914",
		assessment: "written exam",
		status: "complete",
	},
	{
		title: "Semantics of First Order Logic",
		id: 2,
		startDate: new Date("2020-10-21"),
		endDate: new Date("2020-10-28"),
		moduleCode: "CO140",
		owner: "ip914",
		prefix: "PMT",
		assessment: "unassessed",
		status: "unreleased",
	},
	{
		title: "Semantics of FOL and Translation",
		id: 3,
		startDate: new Date("2020-10-28"),
		endDate: new Date("2020-11-04"),
		moduleCode: "CO140",
		owner: "ip914",
		prefix: "PMT",
		assessment: "unassessed submission",
		status: "unreleased",
	},
	{
		title: "Coursework 1",
		id: 4,
		startDate: new Date("2020-10-05"),
		endDate: new Date("2020-10-12"),
		moduleCode: "CO112",
		owner: "ip914",
		prefix: "CW",
		assessment: "individual assessed",
		status: "late",
	},
	{
		title: "Practical 1",
		id: 5,
		startDate: new Date("2020-10-05"),
		endDate: new Date("2020-10-16"),
		moduleCode: "CO120.2",
		owner: "ip914",
		prefix: "PPT",
		assessment: "group assessed",
		status: "complete",
	},
	{
		title: "Worksheet 1",
		id: 6,
		startDate: new Date("2020-10-12"),
		endDate: new Date("2020-11-06"),
		moduleCode: "CO145",
		owner: "ip914",
		prefix: "MMT",
		assessment: "individual assessed",
		status: "due",
	}
]
