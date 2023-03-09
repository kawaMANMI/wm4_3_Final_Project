import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AllResources from "./AllResources";

function LandingPageMentor({ myClassDarkMode }) {
	const navigate = useNavigate();

	function handleSkill() {
		navigate("/skills");
	}
	function handleStudents() {
		navigate("/mentor");
	}
	return (
		<div>
			<Container
				style={{
					marginTop: "30px",
					marginBottom: "30px",
					border: "1px solid grey",
					borderRadius: "5px",
					boxShadow: "1px 3px 3px #888888",
				}}
				className={myClassDarkMode}
			>
				<Row>
					{/* <Col sm={12} md={6}> */}
					<Card className={myClassDarkMode} style={{ marginTop: "30px" }}>
						<Card.Header
							className="card-header"
							as="h4"
							style={{ textAlign: "center" }}
						>
							Welcome to CYF Knowledge Checklist
						</Card.Header>
						<Card.Body>
							The aim of this application is to give CYF trainees support whilst
							they study some basic technical skills and inspire students to
							continue with their self-study. The goal of this is to provide
							students with an opportunity to learn new skills and to improve
							their knowledge. It also provides a Tech foundation in the world
							of programming through the development of HTML , CSS and
							JavaScript skills. This builds the fundamental skills needed to
							learn and succeed in any of the CodeYourFuture courses and also in
							a professional career.
						</Card.Body>
					</Card>
				</Row>
				<Row style={{ marginTop: "30px" }}>
					<Col className={`d-flex justify-content-center ${myClassDarkMode}`}>
						<Button variant="danger" onClick={handleStudents}>
							View Students List
						</Button>
					</Col>
					<Col className={`d-flex justify-content-center ${myClassDarkMode}`}>
						<Button variant="danger" onClick={handleSkill}>
							Go to Learning Objectives
						</Button>
					</Col>
				</Row>
				<AllResources myClassDarkMode={myClassDarkMode} />
			</Container>
		</div>
	);
}

export default LandingPageMentor;
