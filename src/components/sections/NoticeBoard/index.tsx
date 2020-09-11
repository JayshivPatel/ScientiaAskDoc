import React from "react";
import NoticeItem from "components/sections/NoticeBoard/components/NoticeItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";

const NoticeBoard: React.FC = () => {
  return (
    <>
      <h4>Notice Board</h4>
			<Row>
      {noticeItems.map(({ heading, user, time, body }) => (
        <Col md={6}>
          <NoticeItem
            key={heading}
            heading={heading}
            user={user}
            time={time}
            body={body}
          />
        </Col>
      ))}
			</Row>
    </>
  );
};

export default NoticeBoard;

const noticeItems = [
  {
    heading: "Lab Closure Information",
    user: "Mr. Zachery Hroderich",
    time: "1 Minute Ago",
    body:
      "Computing lab rooms 202, 206, and 219 would be closed for the year one haskell exams on Friday 20th of April.",
  },
  {
    heading: "Exam Timetable Released",
    user: "Prof. Leonardas Quinctius",
    time: "1 hour Ago",
    body:
      "The Summer Exams timetable has now been re-released, to reflect the changes for online exams due to the on-going health crisis. Information regarding the schedule and remote assessment policies can be found in the exams page",
  },
  {
    heading: "Pass Requirements For Year Two",
    user: "Dr. Rosalind Baker",
    time: "5 hours Ago",
    body:
      "The exams will still be considered as exams, even though they are now online, so all stated pass requirements still apply. To pass a core module, it is 40% overall, i.e. coursework + exams combined at 15% + 85%. To pass 161, it is 50% overall; the percentage breakdown is on the website.",
  },
];
