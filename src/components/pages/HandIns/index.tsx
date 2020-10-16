import React from "react"


interface Props {
  studentID: string,
  courseID: string,
  exerciseID: number,
}

const HandIns: React.FC<Props> = ({
  studentID,
  courseID,
  exerciseID,
}) => {



  return (
    <div>Submission Page Goes Here!</div>
  )
}

export default HandIns