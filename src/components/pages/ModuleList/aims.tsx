import React from "react"

export const teachingAims: { [moduleCode: string]: JSX.Element } = {
	70008: (
		<>
			<div>
				<p>
					The course is motivated by the increasing need for a theory of
					concurrent process in real systems and languages. Classroom sessions
					will include traditional lectures and some supervised problem solving,
					which are designed to illustrate the principles. The lab sessions will
					use one of the main stream programming languages for distributed
					communications and protocol description languages.
				</p>
				<p>
					The course provides the theories and techniques to analyse concurrent
					computations based on the basic mathematics behind process algebra and
					their type systems. The course will look at principles of concurrent
					message passing programming and software, addressing specification and
					design of message passing languages and distributed protocols. You
					will learn the application areas of concurrent processes and their
					type systems, including actor-based programs (such as Scala),
					channel-based programs (such as Go), network protocols (such as
					SMTP/HTTP), robotics programming and microservices.
				</p>
			</div>
			<div>
				More specifically, students will:
				<ol>
					<li>
						Gain familiarity with the operational semantics and theory of
						concurrent processes.
					</li>
					<li>
						Learn the principles to evaluate various process calculi in the
						literature and examine their expressiveness.
					</li>
					<li>
						Learn a type theory of concurrency and communications in order to
						specify and verify message-passing communications.
					</li>
					<li>
						Practise concurrent processes and type theory via several
						applications -- network protocols, program analysis, and concurrent
						robotics.
					</li>
					<li>
						Be able to apply the taught techniques of concurrency theories to
						ensure correctness of concurrent applications such as
						deadlock-freedom and type/communication safety.
					</li>
				</ol>
			</div>
		</>
	),
	60021: (
		<p>
			This is a project-based module where you work in a team to carry out the
			development and management of a relatively large scale software project,
			building a piece of software to fulfil the needs of a p articular
			customer. You will put into practice state-of-the-art techniques used in
			industrial software development to ensure that your team produces software
			co-operatively, reliably and on schedule. Each team will work on a
			different project, and will receive individual coaching to provide support
			and advice relevant to their particular project.
		</p>
	),
}
