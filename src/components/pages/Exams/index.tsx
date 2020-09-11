import React from "react";
import Dandruff from "components/headings/Dandruff";

const Exams: React.FC = () => {
  return (
    <>
      <Dandruff heading="Exams" />
      {/* TODO: Convert below into MarkDown */}
      <div>
        {/* saved from url=(0027)https://exams.doc.ic.ac.uk/ */}
        <p>
          Messages from the Senior Tutor about examination results for Computing
          and JMC students are now available - please see your grades page using
          the link below. Also MSc students will find their unofficial
          examination results and messages.
        </p>
        <p>
          <a href="https://exams.doc.ic.ac.uk/prog/showgrades.cgi">
            Your own unofficial grades for 2019-20
          </a>
          Note that letter grades (BEng/MEng/JMC) are A,B,C,D,E,F,Fail.
        </p>
        <p>
          <a href="https://exams.doc.ic.ac.uk/feedback/2019-2020">Feedback</a>{" "}
          from examiners on Term 2 and Term 3 exams. (C460 to follow)
        </p>
        <p>
          {" "}
          <a href="https://exams.doc.ic.ac.uk/sept2020tt.html">
            August/September exam timetable
          </a>
          {/*
<p> August/September exam period:
<ul>
<li>Monday 24 August - Friday 4 September 2020 (not including bank holiday Monday 31 August):
First, second and some third year exams
<li>Monday 14 September - Wednesday 23 September 2020 (possibly extended to Friday 25 September if necessary): MSc and some third year exams
</ul>
Timetable in preparation.
/*/}
        </p>
        <p>Department of Computing main exam periods 2019-2020</p>
        <ul>
          <li>
            {" "}
            Monday 9 December 2019 - Friday 13 December 2019 (last week of Term
            1)
          </li>
          <li>
            {" "}
            Monday 16 March 2020 - Friday 20 March 2020 (last week of Term 2)
          </li>
          <li> Monday 27 April 2020 - Friday 15 May 2020</li>
        </ul>
        <p>
          Please note: Examination marks may be scaled, either up or down, at
          the discretion of the relevant Examination Board.
        </p>
        <p>
          <a href="https://exams.doc.ic.ac.uk/prog/showterm1grades.cgi">
            Your own unofficial marks for Term 1 modules taken in 2019-20
          </a>
          Update 29 April: C550 marks now available for MSc Computing.
        </p>
        <p>
          Your personal examination timetable can be found on your
          <a href="https://exams.doc.ic.ac.uk/prog/candidate.cgi">
            Student personal page
          </a>
          .
        </p>
        <p>
          <a href="https://exams.doc.ic.ac.uk/prog/generaltimetable.cgi">
            Examination timetable
          </a>{" "}
          with dates and times for Term 3 exams
        </p>
        <p>
          {" "}
          <a href="https://exams.doc.ic.ac.uk/Summer2020timetable.html">
            Date, times, rubrics, and examiner contacts
          </a>{" "}
          for remote exams Summer 2020.
        </p>
        <p>
          {" "}
          <a href="https://piazza.com/class/k84p6uilz3j13d">
            Piazza board
          </a>{" "}
          discussing remote exams Summer 2020.
        </p>
        <div className="alert">
          All Dept of Computing Term 3 exams will start at 11 a.m. British
          Summer Time. Dates are as previously announced.
          <br />
          C331 Network and Web Security will take place on Tuesday 12 May at 11
          a.m. and will have a revised duration of 120 minutes.
          <p>
            There will be practice sessions on{" "}
            <a href="https://cate.doc.ic.ac.uk/">CATE</a> on Thursday 16 April,
            Friday 17 April and Monday 20 April. These will start at 11 a.m.
            BST, last for 60 minutes, and will then have 30 minutes of
            post-processing time. Look for exercises 61, 62 and 63 on courses
            150, 211, 501, 527, 556, 580 (whichever you are registered for).
          </p>
          <p>
            There will be practice sessions for four exams which will use
            AnswerBook as well as CATE:
          </p>
          <ul>
            <li>
              C220=MC220 Software Engineering Design on Tuesday 21 April
              (11am-1pm UK time)
            </li>
            <li>
              C331 Network and Web Security on Wednesday 22 April (11am-1pm UK
              time)
            </li>
            <li>C526 Databases on Wednesday 22 April (11am-1pm UK time)</li>
            <li>
              C575 Software Engineering on Wednesday 22 April (11am-1pm UK time)
            </li>
          </ul>
          See the relevant Piazza course boards for more information.
        </div>
        <p>
          {" "}
          <a href="https://exams.doc.ic.ac.uk/March2020timetable.html">
            Date, times, rubrics, and examiner contacts
          </a>{" "}
          for remote exams March 2020.
        </p>
        <p>
          Update 15 March: Start times of 2 p.m. March exams moved to 3 p.m.
          <br />
          Update 13 March: All March exams are done via{" "}
          <a href="https://cate.doc.ic.ac.uk/">CATE</a>. C318 Custom Computing
          and C416 Machine Learning for Imaging have been moved to Tuesday 17
          March at 2 p.m. C331 Network and Web Security is postponed to Summer
          Term.
        </p>
        <p>
          <a href="http://www.imperial.ac.uk/about/covid-19">
            College Coronavirus webpages
          </a>
          {/*
Please note that the grades shown are as in July before any supplementary September results.
<p> Some exams will take place in <a href='https://www.imperial.ac.uk/media/imperial-college/administration-and-support-services/timetabling/internal/exams/CAGB-309.pdf'>CAGB309</a>.
/*/}
        </p>
        <p>
          Some exams will take place in{" "}
          <a href="https://www.imperial.ac.uk/media/imperial-college/administration-and-support-services/operational-excellence/internal/QTR.pdf">
            QTR
          </a>{" "}
          (Queen's Tower Rooms) on Level 1 of the Sherfield Building.
          {/*
Please ensure that your login is lower case (xyz123) and not upper case (XYZ123).
<div class='alert'>
<p> Please note that C220S=MC220S Networks and Communications and the Java Test will now take place in Huxley Room 210 (labs).
</div>
<p><a href='sept2019tt.html'>2019 Department of Computing August/September Examinations Timetable</a>
/*/}
        </p>
        <p>
          Some exams will take place in rooms EE403, EE406/7, EE508 in the
          Electrical Engeering Building (number 16 on{" "}
          <a href="https://www.imperial.ac.uk/media/imperial-college/visit/public/SouthKensingtonCampus.pdf">
            map
          </a>
          ).
        </p>
        <p>
          Some exams will take place in the Great Hall on Level 2 of the
          Sherfield Building.
        </p>
        <p>
          Some exams will take place in room{" "}
          <a href="https://www.imperial.ac.uk/engineering/study/current/teaching-spaces/skem-301/">
            SKEM301
          </a>{" "}
          of the Skempton Building (number 27 on{" "}
          <a href="https://www.imperial.ac.uk/media/imperial-college/visit/public/SouthKensingtonCampus.pdf">
            map
          </a>
          ).
          {/*
Please note that you enter from Queen's Lawn opposite the Queen's Tower - see <a href='https://www.imperial.ac.uk/media/imperial-college/administration-and-support-services/operational-excellence/internal/QTR.pdf'>map</a>.
<p>Candidates for August/September examinations: unofficial results are now available via your grades page (see below).
/*/}
          {/*
on the afternoon of Monday 17 September 2018.
<p><a href ='Recommendations of the UG Prize Committee 2017_2018.pdf'>Recommendations of the Undergraduate Prize Committee</a>
/*/}
        </p>
        <p>
          Your attention is drawn to the{" "}
          <a href="https://www.imperial.ac.uk/student-records-and-data/for-current-students/undergraduate-and-taught-postgraduate/exams-assessments-and-regulations/appeals/">
            new appeals procedure
          </a>
          . Please note that time limits apply.
          {/*
<p>The timetable for August/September examinations (SQTs) is in preparation and will be available shortly.
<p>
The August/September SQT examinations will take place in Room 206 (back lab behind the main lab 219).
/*/}
          {/*
<p><a href='prog/showterm1grades.cgi'>Your own unofficial grades for Term 1 modules taken in 2017-18</A> (updated 5 March 2018 to show additionally C550 marks for MSc Computing Science).
Please ensure that your login is lower case (xyz123) and not upper case (XYZ123).
/*/}
          {/*
<p><a href='ttbydate2017-2018.html'>Examination Timetable for 2017-2018</a>
<div class='alert'>
<p>
Please note that the exam for
C404H Separation Logic: Local Reasoning about Programs will take place on Friday 8 December at 14:00.
<p>
Please note that due to teaching lost through strike action the following exams have each had one question removed by the examiners:
<ul>
<li>C303 Systems Verification - answer all three questions
<li>C395 Machine Learning - answer all two questions
<li>C467H Principles of Decentralised Ledgers - answer all two questions
</ul>
</div>
<p>Your personal examination timetable can be found on your
<A HREF='prog/candidate.cgi'>Student personal page</A>,
once you have <a href='https://dbc.doc.ic.ac.uk/internalreg'>registered</a> (at Level 3) for any optional courses.
Please ensure that your login is lower case (xyz123) and not upper case (XYZ123).
/*/}
          {/*
<p><a href='auttimetable20151125.html'>Examination Timetable for Term 1</a>
/*/}
          {/*
<p>
<a href='prog/examtermglobal.cgi'>Global</a> information on which exams will be held in which of the three periods ('exam term'). 
The final column shows co-scheduled groups.  Exams in the same group will be timetabled at the same time, and so you cannot take both.
Also by <a href='prog/examtermselect.cgi'>degree and year</a>.
/*/}
          {/*
<p><a href='sept2015tt.html'>2015 Department of Computing September Examinations Timetable</a>
<p>Dept of Mathematics <a href='http://www3.imperial.ac.uk/mathematics/students/timetables'>September Examinations Timetable</a> (JMC) 
<p> Your option information is at
<a href='https://dbc.doc.ic.ac.uk/internalreg/'>https://dbc.doc.ic.ac.uk/internalreg</a>.
<p><a href='ttbydate20150303.html'>Examination Timetable for 2014-2015</a>.
<p>
Please register your options between Friday 30 January 2015 and Wednesday 11 February 2015 at
<a href='https://dbc.doc.ic.ac.uk/internalreg/'>https://dbc.doc.ic.ac.uk/internalreg</a>.

<p>
NB EIE students do not register through this system,
since their options are registered through EEE.
Once we have received information from other departments, it will
appear at 
<a href='https://dbc.doc.ic.ac.uk/internalreg/'>https://dbc.doc.ic.ac.uk/internalreg</a>.
<p>Note for resit students:
<ul>
<li>
C347 Distributed Algorithms had code C437 previously.
<li>
C529 Distributed Systems had code C335 previously.
</ul>

<p>
Directions for <a href='RSMdirections.pdf'>Royal School of Mines Rooms 1.51 and G38</a>.
<p>A detailed timetable for Term 1 will be announced later in the term.
<p>Timetables for the remaining two periods will be announced during Term 2.
<p>
Informal results for Computing students should be available late on
Friday 13 September 2013 via your <a href='prog/showgrades.cgi'>grades page</a>.
<p><a href='ttbydate2013.html'>2013 Department of Computing Examinations Timetable</a>
/*/}
        </p>
        <p></p>
        <p>
          {" "}
          Your examination candidate number will be your CID as on your College
          swipe card.
        </p>
        <p>
          <a href="http://www.imperial.ac.uk/media/imperial-college/administration-and-support-services/registry/academic-governance/public/academic-policy/exam-arrangements-and-re-sits/Instructions-to-candidates-for-examinations.pdf">
            General instructions to candidates for examinations
          </a>
        </p>
        <p>
          <a href="https://exams.doc.ic.ac.uk/prog/rubricselect.cgi">
            Examination Rubrics
          </a>{" "}
          (durations, how many questions)
          {/*
<P><A HREF='faq.html'>Frequently Asked Questions</A> (registration)
<P><A HREF='prog/schemeselect.cgi'> Examination schemes</A>
/*/}
          {/*
<P><A HREF='prog/generaltimetable.cgi'>Timetable</A>
*/}
        </p>
        <p>
          <a href="https://exams.doc.ic.ac.uk/l2-exams-desks.pdf">
            Desk layout in Rooms 219, 202 and 206
          </a>
        </p>

        <p>
          <a href="https://exams.doc.ic.ac.uk/calculators.html">Calculators</a>
        </p>
      </div>
    </>
  );
};

export default Exams;
