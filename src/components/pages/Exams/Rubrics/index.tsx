import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

const ExamRubrics: React.FC = () => {
  return (
    <>
      <MyBreadcrumbs />
      <h3>Rubrics</h3>
      <br />
      {/* TODO: Convert below into MarkDown */}
      <table className="table">
        <tbody>
          <tr>
            <th> Exam </th>
            <th> Title </th>
            <th> Duration </th>
            <th> Answer </th>
          </tr>
          <tr>
            <td> C140=MC140 </td>
            <td> Logic </td>
            <td> 80 </td>
            <td> 2 from 2 </td>
          </tr>
          <tr>
            <td> C141=MC141 </td>
            <td> Reasoning about Programs </td>
            <td> 80 </td>
            <td> 2 from 2 </td>
          </tr>
          <tr>
            <td> C150=MC150 </td>
            <td> Graphs and Algorithms </td>
            <td> 80 </td>
            <td> 2 from 2 </td>
          </tr>
          <tr>
            <td> MATH94003 </td>
            <td> Foundations of Analysis </td>
            <td> n/a </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH94005 </td>
            <td> Applied Methods and Linear Algebra </td>
            <td> n/a </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH94006 </td>
            <td> Algebra and Analysis </td>
            <td> n/a </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH94007 </td>
            <td> Mathematical Methods 1 </td>
            <td> n/a </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH40009 </td>
            <td> Introduction to University Mathematics </td>
            <td> n/a </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH40010 </td>
            <td> Analysis for JMC </td>
            <td> 180 </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH40011 </td>
            <td> Calculus for JMC </td>
            <td> 180 </td>
            <td> unknown from unknown </td>
          </tr>
          <tr>
            <td> MATH40012 </td>
            <td> Calculus, Algebra and Analysis for JMC </td>
            <td> 180 </td>
            <td> unknown from unknown </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExamRubrics;
