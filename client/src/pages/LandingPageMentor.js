import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AllResources from "./AllResources";

function LandingPageMentor() {
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
					border: "1px solid grey",
					borderRadius: "5px",
					boxShadow: "1px 3px 3px #888888",
				}}
			>
				<Row>
					{/* <Col sm={12} md={6}> */}
					<Card style={{ marginTop: "30px" }}>
						<Card.Header
							className="card-header"
							as="h4"
							style={{ textAlign: "center" }}
						>
							Welcome to CYF Knowledge Checklist
						</Card.Header>
						<Card.Body>
							The aim of this application is to give learner support whilst they
							study some basic technical skills and inspiring students to
							continue with their self study. The goal of this is to provide
							students with an opportunity to learn new skills and to improve
							their knowledge. Provide a tech foundation in the world of
							programming through the development of HTML , CSS and JavaScript
							skills. This builds the fundamental skills needed to learn and
							succeed on any of the CodeYourFuture courses and also in a
							professional career.
						</Card.Body>
					</Card>
					{/* </Col> */}
					<Col sm={12} md={6} className="d-flex justify-content-center"></Col>
				</Row>
				<Row style={{ marginTop: "30px" }}>
					<Col className="d-flex justify-content-center">
						<Button variant="danger" onClick={handleStudents}>
							View Students List
						</Button>
					</Col>
					<Col className="d-flex justify-content-center">
						<Button variant="danger" onClick={handleSkill}>
							Go to Learning Objectives
						</Button>
					</Col>
				</Row>
				<Card style={{ marginTop: "30px" }}>
					<AllResources />
				</Card>
			</Container>
		</div>
	);
}

export default LandingPageMentor;
