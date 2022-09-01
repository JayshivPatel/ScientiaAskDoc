import { Container } from '../styles/_app.style'
import '../styles/questions.css'

const Questions = () => {
  return (
    <Container>
      <section style={{ marginBottom: '2rem' }}>
        <h1>Questions and Answers</h1>
        <details>
          <summary>General</summary>
          <ul>
            <li>
              <h2>How can I contact my personal tutor over summer?</h2>
              <p>
                You can contact your personal tutor by email as you would during the academic year.
                If they are not available, a member of the Senior Tutor team should be able to help.
              </p>
            </li>
            <li>
              <h2>Where is the best place to go on campus if it's hot?</h2>
              <p>The coolest place to go for DoC students is labs</p>
            </li>

            <li>
              <h2>Who is the department tutor?</h2>
              <p>
                The UG Senior Tutor is{' '}
                <a target="_blank" rel="noreferrer" href="mailto:m.valera-espina@imperial.ac.uk">
                  Dr Maria Valera-Espina
                </a>
              </p>
              <p>The PG Senior Tutors are:</p>
              <p>
                Teaching:{' '}
                <a target="_blank" rel="noreferrer" ref="mailto:t.lancaster@imperial.ac.uk">
                  Dr Thomas Lancaster
                </a>
              </p>
              <p>
                Research:{' '}
                <a target="_blank" rel="noreferrer" href="mailto:s.drossopolou@imperial.ac.uk">
                  Professor Sophia Drossopolou
                </a>
              </p>
            </li>

            <li>
              <h2>Who is the current DoCSoc committee?</h2>
              <p>
                {' '}
                The list of current DoCSoc committee members can be viewed{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperialcollegeunion.org/activities/a-to-z/computing"
                >
                  here
                </a>
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Buildings and Rooms</summary>
          <ul>
            <li>
              <h2>Where is Huxley?</h2>
              <p>Huxley Building is located at 180 Queen’s Gate, on South Kensington Campus.</p>
              <p>
                Follow this{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/media/imperial-college/visit/public/SouthKensingtonCampus.pdf"
                >
                  link
                </a>{' '}
                to find its location of the map
              </p>
            </li>

            <li>
              <h2>Where is Maria's office?</h2>
              <p>Maria’s room is located at room 226, Huxley Building.</p>
            </li>
            <li>
              <h2>How do I book Labs?</h2>
              <p>
                Use the{' '}
                <a target="_blank" rel="noreferrer" href="https://mrbs.doc.ic.ac.uk/lab/">
                  {' '}
                  link
                </a>
              </p>
            </li>
            <li>
              <h2>What are Labs opening hours?</h2>
              <p>8AM till midnight</p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Exams and Assessment</summary>
          <ul>
            <li>
              <h2>Can I get extra time for exams?</h2>
              <p>
                {' '}
                If you have a disability or impairment and you would like access to adjustments and
                support, such as additional exam arrangements, your first point of contact should be
                the Department Disability Officer{' '}
                <a target="_blank" rel="noreferrer" href="mailto:t.lancaster@imperial.ac.uk">
                  Dr Thomas Lancaster
                </a>
              </p>
              <p>
                You must{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/disability-advisory-service/current-students/evidence/"
                >
                  submit
                </a>{' '}
                evidence of your disability or impairment from a qualified professional to the
                Department Disability Officer, who will apply for the arrangement on your behalf
              </p>
            </li>

            <li>
              <h2>When do I get my exam results?</h2>
              <p>
                Final exam results are usually released to you via email by the College Registry in
                Mid-July, once they have been verified at the final meeting of the Board of
                Examiners.
              </p>
            </li>

            <li>
              <h2>What is the Dean's List?</h2>
              <p>
                The Dean’s List recognises (UG?) students who are in the top 10% of their cohort and
                have achieved the equivalent of a 1st for the year (equal to or above 70%-year
                average).
              </p>
            </li>

            <li>
              <h2>How do I see my exam schedule?</h2>
              <p>
                Please visit the{' '}
                <a target="_blank" rel="noreferrer" href="https://exams.doc.ic.ac.uk">
                  link
                </a>{' '}
                and follow the link "Exam Timetable"
              </p>
            </li>

            <li>
              <h2>Where can I find past exam papers?</h2>
              <p>
                Please visit the{' '}
                <a target="_blank" rel="noreferrer" href="https://exams.doc.ic.ac.uk">
                  link
                </a>{' '}
                and for the link "Past Exams Archive"
              </p>
            </li>

            <li>
              <h2>What percentage on an exam corresponds to a specific grade?</h2>
              <p>
                See the converter on{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://cate.doc.ic.ac.uk/grading.cghi?key=2021"
                >
                  CATE
                </a>
              </p>
            </li>

            <li>
              <h2>What happens if I fails an exam?</h2>
              <p>You will need to take the resit exam, capped at 40%.</p>
            </li>

            <li>
              <h2>Are resits capped?</h2>
              <p>
                Resits are capped at 40%. With accepted mitigating circumstances, you will get an
                uncapped (no penalty) resit. (50% for Computing Practical 1)
              </p>
            </li>

            <li>
              <h2>Can you fail a lab in second year?</h2>
              <p>Yes, you need at least 40% to pass</p>
            </li>

            <li>
              <h2>When are resits?</h2>
              <p>
                Exam resits start in late August, finishing in late September. You will be notified
                by email of the exact dates if you need to resit.{' '}
              </p>
            </li>

            <li>
              <h2>Can I submit a mitigation form late?</h2>
              <p>
                If you submit the form late (more than 10 working days after the assessment or
                coursework submission deadline), you must provide a credible and compelling reason
                as to why your circumstances could not be notified before the deadline.
              </p>
            </li>

            <li>
              <h2>When will I find out if my mitigating circumstances have been approved?</h2>
              <p>You will be emailed the outcome from the Senior Tutor</p>
            </li>
            <li>
              <h2>Where can I see my grades?</h2>
              <p>
                Follow this{' '}
                <a target="_blank" rel="noreferrer" href="https://exams.doc.ic.ac.uk/">
                  link
                </a>{' '}
                and click on the link at the top of the page called "Your own unofficial grades"
              </p>
            </li>
            <li>
              <h2>When is my first exam?</h2>
              <p>
                Usually in the first week of May. Timetable available{' '}
                <a target="_blank" rel="noreferrer" href="https://exams.doc.ic.ac.uk">
                  here
                </a>
              </p>
            </li>
            <li>
              <h2>How many times can I resit an exam?</h2>
              <p>
                If you fail your August / September resit, you might be able to resit it the
                following year as long as you don’t fail Computing Practical I again (First Year).
                In general resit decisions are up to the September Exam Board, and they take
                everything into consideration
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Miscellaneous</summary>
          <ul>
            <li>
              <h2>Will college ID cards work over summer? </h2>
              <p> If you are a continuing student, you should still be able to use your card. </p>
            </li>

            <li>
              <h2>Can I transfer from BEng to MEng? </h2>
              <p>
                You need to contact the UG Senior Tutor,{' '}
                <a target="_blank" rel="noreferrer" href="mailto:m.valera-espina@imperial.ac.uk">
                  {' '}
                  Dr Maria Valera-Espina
                </a>
              </p>
            </li>

            <li>
              <h2>Can I transfer from MEng to BEng? </h2>
              <p>
                You need to contact the UG Senior Tutor,{' '}
                <a target="_blank" rel="noreferrer" href="mailto:m.valera-espina@imperial.ac.uk">
                  {' '}
                  Dr Maria Valera-Espina
                </a>
              </p>
            </li>

            <li>
              <h2>Can I transfer from Computing to JMC? </h2>
              <p>
                You need to contact the UG Senior Tutor,{' '}
                <a target="_blank" rel="noreferrer" href="mailto:m.valera-espina@imperial.ac.uk">
                  {' '}
                  Dr Maria Valera-Espina
                </a>
              </p>
            </li>

            <li>
              <h2>When does the term start and end? </h2>
              <p>
                This information can be found here:{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/admin-services/registry/term-dates/"
                >
                  {' '}
                  Term dates
                </a>
              </p>
            </li>

            <li>
              <h2>Where can I find my transcript /student letter? </h2>
              <p>
                This can be found at{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/admin-services/ict/self-service/admin-systems/my-imperial/"
                >
                  {' '}
                  My Imperial
                </a>
                , and selecting ‘My Documents’ and logging in via ‘Imperial Student Login’.{' '}
              </p>
            </li>
            <li>
              <h2>How do I transfer to a different university?</h2>
              <p>
                You should email the university you want to transfer to. The Senior Tutor can
                provide a reference for your application.
              </p>
            </li>
            <li>
              <h2>When should I apply for a Masters?</h2>
              <p>From the beginning of your final year?</p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Health and Wellbeing</summary>
          <ul>
            <li>
              <h2>How can I get access to a dentist/doctor? </h2>
              <p>
                You will need to register with a GP as soon as possible to access treatment. Please
                visit this{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/student-support-zone/your-health/doctor-and-dentist/"
                >
                  link
                </a>{' '}
                to find out how to do this:
              </p>
            </li>

            <li>
              <h2>Is student support available? </h2>
              <p>
                Imperial offers different types of support, ranging from departmental to halls. To
                find out more follow this{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/student-support-zone/support/"
                >
                  {' '}
                  link
                </a>
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Tech Support</summary>
          <ul>
            <li>
              <h2>Where are my old repositories?</h2>
              <p>
                Email{' '}
                <a target="_blank" rel="noreferrer" href="mailto:doc-help@imperial.ac.uk">
                  {' '}
                  Doc Help
                </a>{' '}
                or search Gitolite on the CSG Board
              </p>
            </li>
            <li>
              <h2>Which Wi-Fi can I connect to? </h2>
              <p>
                The network to connect to is: Imperial-WPA (all current students). Follow this{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/admin-services/ict/self-service/connect-communicate/wifi-and-networks/access-wifi/imperial-wpa/"
                >
                  {' '}
                  link
                </a>{' '}
                to find out more:{' '}
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Careers</summary>
          <ul>
            <li>
              <h2>When do I apply for my third-year placement</h2>
              <p>
                Companies post their job adverts for placements from the start of the first term so
                you can apply from the beginning of the 3rd Year.
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Food and Drink</summary>
          <ul>
            <li>
              <h2>Can I go to the senior common room? </h2>
              <p>
                The Senior Common Room (SCR) is the central cafeteria for all postgraduates and
                academics. However it can be used by all staff and students.{' '}
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>UG and PG Opportunities (UROPs/IROPs)</summary>
          <ul>
            <li>
              <h2>What and when is ICHack? </h2>
              <p>
                {' '}
                ICHack is an annual hackathon organised by DoCSoc at Imperial. Further information
                can be found at:{' '}
                <a target="_blank" rel="noreferrer" href="https://ichack.org">
                  {' '}
                  ICHack Website
                </a>
              </p>
            </li>

            <li>
              <h2>How do I join ICHack? </h2>
              <p>
                {' '}
                DoCSoc releases tickets nearer to the event. You should receive details in an email.
              </p>
            </li>
            <li>
              <h2>How do I apply for a UROP?</h2>
              <p>
                Either email a member of the teaching staff, or apply to one of the job openings
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Module Selection</summary>
          <ul>
            <li>
              <h2>How many modules can I choose in third year</h2>
              <p>One, the rest are compulsory</p>
            </li>
            <li>
              <h2>When should I submit which modules I have chosen for the next year?</h2>
              <p>You only need to select before you take the exams</p>
            </li>
            <li>
              <h2>Where do I submit which modules I want to pick? </h2>
              <p>
                {' '}
                CATE -{'>'} Related external sites -{'>'} Email and Module Subscription -{'>'}{' '}
                Change the module you want to choose to Lv.3{' '}
              </p>
            </li>
          </ul>
        </details>
        <details>
          <summary>Course Support and Advice</summary>
          <ul>
            <li>
              <h2>What programming languages am I going to learn in the first year?</h2>
              <p>Kotlin, Java, C, Haskell</p>
            </li>
            <li>
              <h2>What programming languages am I going to learn in second year? </h2>
              <p> Pintos: C</p>
              <p>WACC: Any</p>
              <p>DRP (JMC optional): Any</p>
              <p>Algorithms (JMC optional): Haskell </p>
            </li>
            <li>
              <h2>What programming languages am I going to learn in third year?</h2>
              <p>
                It depends on the module you take. C++ is used for Advanced Databases. Python for
                Introduction to ML
              </p>
            </li>

            <li>
              <h2>When do I get my Haskell/Java/C exam result? </h2>
              <p> It usually takes 2-3 weeks, after the exam has taken place.</p>
            </li>
            <li>
              <h2>How do I transfer to another course?</h2>
              <p>
                You can talk to your Senior Tutor then speak to the admissions teams of the
                department you want to transfer to. If it’s too late, you might just have to apply
                through UCAS.
              </p>
            </li>
            <li>
              <h2>Do I have to attend PMT/PPT sessions? </h2>
              <p>
                Attendance is taken but you technically don't have to attend if you have a valid
                reason
              </p>
            </li>
            <li>
              <h2>Is Horizons compulsory for second year? </h2>
              <p>
                Imperial Horizons is optional in the 1st and 2nd years of study. In your 3rd year,
                you must complete a for-degree-credit I-Explore module, where you will have the
                option to take a Horizons module.
              </p>
            </li>
            <li>
              <h2>What are the module weightings for my year?</h2>
              <p>
                Information available here:{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/computing/current-students/course-admin/regulations/beng-comp/"
                >
                  {' '}
                  BEng
                </a>
                ,{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.imperial.ac.uk/computing/current-students/course-admin/regulations/meng-comp/"
                >
                  {' '}
                  MEng
                </a>
              </p>
            </li>
            <li>
              <h2>Can I appeal the outcome of my mitigating circumstances? </h2>
              <p>
                If you believe there has been an error or procedural unfairness in the mitigating
                circumstances procedure, you can submit a request for an academic appeal. The form
                can be found here:{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://imperiallondon.sharepoint.com/sites/UG-DocMitigations-CO/Lists/Appeal%20Form/AllItems.aspx"
                >
                  {' '}
                  DoC Academic Appeal Form.{' '}
                </a>{' '}
                You must submit the form within 15 working days of the publication of results, to
                the email address:{' '}
                <a target="_blank" rel="noreferrer" href="mailto:student.appeals@imperial.ac.uk">
                  {' '}
                  Student Appeals
                </a>
              </p>
            </li>
            <li>
              <h2>Do I need approval to do an industrial placement?</h2>
              <p>
                Mandatory for MEng students and need to get it signed off by the department.
                Self-Placement form if you didn’t apply through the Imperial portal and need to
                potentially show the job advert.{' '}
              </p>
            </li>
            <li>
              <h2>How many people do we need for our group project</h2>
              <p>Depending on the group project, between 3 and 6 members</p>
            </li>
          </ul>
        </details>
      </section>
    </Container>
  )
}

export default Questions
