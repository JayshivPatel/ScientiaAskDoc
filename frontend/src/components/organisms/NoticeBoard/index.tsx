import React from "react";
import NoticeItem from "components/atoms/NoticeItem";

const NoticeBoard: React.FC = () => {
  return (
    <>
      <h4>Notice Board</h4>
      {noticeItems.map(({ heading, user, time, body }) => (
        <NoticeItem key={heading} heading={heading} user={user} time={time} body={body} />
      ))}
    </>
  );
};

export default NoticeBoard;

const noticeItems = [
  {
    heading: "Foyer Closure Information",
    user: "Konstantinos Gkotuzis",
    time: "1 Minute Ago",
    body:
      "The foyer area, along with computing lab rooms 209, 208, and 210 would be closed due to unforeseen circumstances on Friday 20th of April.",
  },
  {
    heading: "Dead body found in foyer area",
    user: "Orenthal James Simpson",
    time: "1 hour Ago",
    body:
      "Whoever left the dead body of Dr Rosalind Baker in the foyer area could you please cleanup after youself, thank you. Nobody needs to see that. ",
  },
  {
    heading: "Autumn Fee Information",
    user: "Rosalind Baker",
    time: "5 hours Ago",
    body:
      "We understand that a lot of you would not be on campus for the autumn term, however that does not mean that you should stop paying us. Good day. ",
  },
];
