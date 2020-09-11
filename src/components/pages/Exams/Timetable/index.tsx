import React from "react";
import Dandruff from "components/headings/Dandruff";

const ExamTimetable: React.FC = () => {
  return (
    <>
      <Dandruff heading="Exam Timetable" />
      {/* TODO: Convert below into MarkDown */}
      <p>Dates and times published for term(s) 1, 2, 3 </p>
      <p>Dates, times and rooms published for term(s) 1, 2, 3 </p>
      <div className="table-responsive">
        <table className="table table-striped table-responsive table-bordered">
          <tbody>
            <tr>
              <th> Exam/Subexam </th>
              <th> Title </th>
              <th> Date </th>
              <th> Time </th>
              <th> Duration </th>
              <th> Room </th>
            </tr>
            <tr>
              <td> C484 </td>
              <td> Quantum Computing </td>
              <td> 9-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 221 </td>
            </tr>
            <tr>
              <td> C572 </td>
              <td> Advanced Databases </td>
              <td> 9-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C491 </td>
              <td> Knowledge Representation </td>
              <td> 9-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CAGB309 </td>
            </tr>
            <tr>
              <td> C316 </td>
              <td> Computer Vision </td>
              <td> 9-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C404 </td>
              <td> Separation Logic: Scalable Reasoning about Programs </td>
              <td> 9-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C333 </td>
              <td> Robotics </td>
              <td> 10-Dec </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C499HR </td>
              <td> Modal Logic </td>
              <td> 10-Dec </td>
              <td> 10:00 </td>
              <td> 70 </td>
              <td> 221 </td>
            </tr>
            <tr>
              <td> C349R </td>
              <td> Information and Coding Theory </td>
              <td> 10-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C406 </td>
              <td> Concurrent Processes </td>
              <td> 10-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C447 </td>
              <td> Advanced Computer Security </td>
              <td> 10-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C337 </td>
              <td> Simulation and Modelling </td>
              <td> 11-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C471 </td>
              <td> Advanced Issues in Object Oriented Programming </td>
              <td> 11-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C553 </td>
              <td> Introduction to Machine Learning </td>
              <td> 11-Dec </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C474 </td>
              <td> Machine Arguing </td>
              <td> 11-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> 342 </td>
            </tr>
            <tr>
              <td> C410 </td>
              <td> Scalable Systems and Data </td>
              <td> 11-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> QTR </td>
            </tr>
            <tr>
              <td> C422 </td>
              <td> Computational Finance </td>
              <td> 11-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> QTR </td>
            </tr>
            <tr>
              <td> C496 </td>
              <td> Mathematics for Machine Learning </td>
              <td> 12-Dec </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C382 </td>
              <td> Type Systems for Programming Languages </td>
              <td> 12-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C424 </td>
              <td> Reinforcement Learning </td>
              <td> 13-Dec </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C332 </td>
              <td> Advanced Computer Architecture </td>
              <td> 13-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C438 </td>
              <td> Complexity </td>
              <td> 13-Dec </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C343 </td>
              <td> Operations Research </td>
              <td> 13-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C470 </td>
              <td> Program Analysis </td>
              <td> 13-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> 219 </td>
            </tr>
            <tr>
              <td> C408 </td>
              <td> Privacy Engineering </td>
              <td> 13-Dec </td>
              <td> 14:00 </td>
              <td> 120 </td>
              <td> 341/2 </td>
            </tr>
            <tr>
              <td> C303 </td>
              <td> Systems Verification </td>
              <td> 16-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C477 </td>
              <td> Computational Optimisation </td>
              <td> 16-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C395 </td>
              <td> Introduction to Machine Learning </td>
              <td> 17-Mar </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C467 </td>
              <td> Principles of Distributed Ledgers </td>
              <td> 17-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C499 </td>
              <td> Modal Logic for Strategic Reasoning in AI </td>
              <td> 17-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C318 </td>
              <td> Custom Computing </td>
              <td> 17-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C416 </td>
              <td> Machine Learning for Imaging </td>
              <td> 17-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C304 </td>
              <td> Logic-Based Learning </td>
              <td> 18-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C339 </td>
              <td> Performance Engineering </td>
              <td> 18-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C417 </td>
              <td> Advanced Computer Graphics </td>
              <td> 18-Mar </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C468 </td>
              <td> Probabilistic Programming </td>
              <td> 18-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C317 </td>
              <td> Graphics </td>
              <td> 18-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C493 </td>
              <td> Probabilistic Inference </td>
              <td> 18-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C460 </td>
              <td> Deep Learning </td>
              <td> 19-Mar </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C315 </td>
              <td> Computer Vision </td>
              <td> 20-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C338 </td>
              <td> Pervasive Computing </td>
              <td> 20-Mar </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C433 </td>
              <td> Advanced Robotics </td>
              <td> 20-Mar </td>
              <td> 10:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C440 </td>
              <td> Software Reliability </td>
              <td> 20-Mar </td>
              <td> 10:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C347 </td>
              <td> Distributed Algorithms </td>
              <td> 20-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C490 </td>
              <td> Natural Language Processing </td>
              <td> 20-Mar </td>
              <td> 15:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C240=MC240 </td>
              <td> Models of Computation </td>
              <td> 27-Apr </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C501 </td>
              <td> Computer Architecture </td>
              <td> 27-Apr </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C575 </td>
              <td> Software Engineering </td>
              <td> 28-Apr </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE/AnswerBook </td>
            </tr>
            <tr>
              <td> C141=MC141 </td>
              <td> Reasoning about Programs </td>
              <td> 29-Apr </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C212 </td>
              <td> Networks and Communications </td>
              <td> 29-Apr </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> MATH95013 </td>
              <td> Statistical Methods </td>
              <td> 29-Apr </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C526 </td>
              <td> Databases </td>
              <td> 30-Apr </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE/AnswerBook </td>
            </tr>
            <tr>
              <td> C140=MC140 </td>
              <td> Logic </td>
              <td> 1-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C220=MC220 </td>
              <td> Software Engineering Design </td>
              <td> 1-May </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE/AnswerBook </td>
            </tr>
            <tr>
              <td> C130 </td>
              <td> Introduction to Databases </td>
              <td> 4-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C202=MC202 </td>
              <td> Algorithms II </td>
              <td> 4-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C580 </td>
              <td> Algorithms </td>
              <td> 4-May </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C231=MC231 </td>
              <td> Introduction to Model-based Artificial Intelligence </td>
              <td> 5-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C561 </td>
              <td> Introduction to Symbolic Artificial Intelligence (MSc) </td>
              <td> 5-May </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C113 </td>
              <td> Introduction to Computer Architecture </td>
              <td> 6-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C211=MC211 </td>
              <td> Operating Systems </td>
              <td> 6-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C556 </td>
              <td>
                {" "}
                Introduction to Symbolic Artificial Intelligence (MSc AI){" "}
              </td>
              <td> 6-May </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C150=MC150 </td>
              <td> Graphs and Algorithms </td>
              <td> 7-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C527 </td>
              <td> Computer Networks and Distributed Systems </td>
              <td> 7-May </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C142 </td>
              <td> Discrete Mathematics </td>
              <td> 11-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C233 </td>
              <td> Computational Techniques </td>
              <td> 11-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C517 </td>
              <td> Object Oriented Design and Programming </td>
              <td> 11-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE/e-submission </td>
            </tr>
            <tr>
              <td> C331 </td>
              <td> Network and Web Security </td>
              <td> 12-May </td>
              <td> 11:00 </td>
              <td> 120 </td>
              <td> CATE/AnswerBook </td>
            </tr>
            <tr>
              <td> C145 </td>
              <td> Mathematics I </td>
              <td> 13-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C221=MC221 </td>
              <td> Compilers </td>
              <td> 13-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C518 </td>
              <td> Logic </td>
              <td> 13-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C112 </td>
              <td> Introduction to Computer Systems </td>
              <td> 15-May </td>
              <td> 11:00 </td>
              <td> 80 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C245 </td>
              <td> Probability and Statistics </td>
              <td> 15-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
            <tr>
              <td> C502 </td>
              <td> Operating Systems </td>
              <td> 15-May </td>
              <td> 11:00 </td>
              <td> 90 </td>
              <td> CATE </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExamTimetable;
