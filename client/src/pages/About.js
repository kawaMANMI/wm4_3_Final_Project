import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

function About({ myClassDarkMode }) {
	const [showCards, setShowCards] = useState(false);

	function CreateDelay(delay) {
		const cardVariants = {
			hidden: { opacity: 0, y: 50 },
			visible: {
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, delay: delay },
			},
		};
		return cardVariants;
	}
	return (
		<div className={`container my-5 ${myClassDarkMode}`}>
			<h2 className="text-center mb-4">
				About CodeYourFuture Knowledge Checklist
			</h2>
			<p style={{ textAlign: "left" }}>
				The CodeYourFuture Knowledge Checklist is an online tool designed to
				help students keep track of their progress and improve their
				understanding of the material covered in the course. It was developed by
				the <span style={{ color: "red" }}>DevDreamer</span> group as the final
				project in the WM4 course in 2023.
			</p>

			<motion.div
				className={`mt-3 ${myClassDarkMode} `}
				variants={CreateDelay(0.5)}
				initial="hidden"
				animate="visible"
			>
				<div className="card-body">
					<h5 className="card-title">
						Subject Categories and Mentorship Tools
					</h5>
					<p className="card-text">
						Our checklist is organized by subject categories, such as HTML/CSS,
						React, and Node, and each student is attached to a class. The
						platform also provides mentorship tools for teachers and mentors to
						edit class learning objectives and track the progress of all
						students in a given class.
					</p>
				</div>
			</motion.div>

			<motion.div
				className={`mt-3 ${myClassDarkMode} `}
				variants={CreateDelay(1)}
				initial="hidden"
				animate="visible"
			>
				<div className="card-body">
					<h5 className="card-title">
						Stretch Goals and Customizable Resources
					</h5>
					<p className="card-text">
						We understand that learning programming can be challenging, which is
						why we offer stretch goals such as resources and assessments to help
						students who may need extra assistance. Our platform also allows
						administrators to edit resources and assessments for each topic.
					</p>
				</div>
			</motion.div>

			<motion.div
				className={`${myClassDarkMode} `}
				variants={CreateDelay(1.5)}
				initial="hidden"
				animate="visible"
			>
				<div className={`mt-3 ${myClassDarkMode} `}>
					<div className="card-body">
						<h5 className="card-title">
							Supportive and Inclusive Learning Environment
						</h5>
						<p className="card-text">
							At CodeYourFuture, we believe that everyone should have access to
							quality education and mentorship regardless of their background.
							We are committed to providing a supportive and inclusive learning
							environment that empowers our students to achieve their goals and
							become successful programmers.
						</p>
					</div>
				</div>
			</motion.div>

			<motion.div
				className={`${myClassDarkMode} `}
				variants={CreateDelay(2)}
				initial="hidden"
				animate="visible"
			>
				<div className="text-center">
					<Button
						variant="danger"
						onClick={() => setShowCards(!showCards)}
						className="mt-4"
					>
						Learn More
					</Button>
				</div>
			</motion.div>

			{showCards ? (
				<motion.div
					className={`${myClassDarkMode} `}
					variants={CreateDelay(0.5)}
					initial="hidden"
					animate="visible"
				>
					<div className="row justify-content-center mt-5 ">
						<div className="col-md-4">
							<Card className={myClassDarkMode}>
								<Card.Body>
									<Card.Title>Track Your Progress</Card.Title>
									<Card.Text>
										Our platform allows students to create an account where they
										can monitor their progress and confidence level in various
										programming skills.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
						<div className="col-md-4">
							<Card className={myClassDarkMode}>
								<Card.Body>
									<Card.Title>Organized by Subject Categories</Card.Title>
									<Card.Text>
										Our checklist is organized by subject categories, such as
										HTML/CSS, React, and Node.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
						<div className="col-md-4">
							<Card className={myClassDarkMode}>
								<Card.Body>
									<Card.Title>Mentorship Tools</Card.Title>
									<Card.Text>
										The platform also provides mentorship tools for teachers and
										mentors to edit class learning objectives and track the
										progress of all students in a given class.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</div>
				</motion.div>
			) : null}
		</div>
	);
}

export default About;
