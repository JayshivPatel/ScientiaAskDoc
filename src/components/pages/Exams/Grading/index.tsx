import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

const ExamGrading: React.FC = () => {
  return (
    <>
      <MyBreadcrumbs />
      <h3>Grading</h3>
      <br />
      {/* TODO: Convert below into MarkDown */}
      <table className="table">
        <tbody>
          <tr>
            <th>Mark range (%)</th>
            <th>Grade</th>
          </tr>
          <tr>
            <td>[80-100]</td>
            <td>
              <b>A*</b>
            </td>
          </tr>
          <tr>
            <td>[70-79]</td>
            <td>
              <b>A</b>
            </td>
          </tr>
          <tr>
            <td>[60-69]</td>
            <td>
              <b>B</b>
            </td>
          </tr>
          <tr>
            <td>[50-59]</td>
            <td>
              <b>C</b>
            </td>
          </tr>
          <tr>
            <td>[40-49]</td>
            <td>
              <b>D</b>
            </td>
          </tr>
          <tr>
            <td>[30-39]</td>
            <td>
              <b>E</b>
            </td>
          </tr>
          <tr>
            <td>[0-29]</td>
            <td>
              <b>F</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExamGrading;
