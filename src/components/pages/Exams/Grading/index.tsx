import React from "react";
import Dandruff from "components/molecules/Dandruff";

const ExamGrading: React.FC = () => {
  return (
    <>
      <Dandruff heading="Grading" />
      {/* TODO: Convert below into MarkDown */}
      <p>
        Every Academic Year has its own schema, as determined annually by the
        Teaching Operations Committee or equivalent.
      </p>
      <p>
        The grades below are to be used in the marking of coursework and
        labwork.
      </p>
      <div className="table-responsive">
        <table className="table table-striped table-responsive table-bordered">
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
      </div>
    </>
  );
};

export default ExamGrading;
