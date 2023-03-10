import React, { useState, useEffect } from "react";
import Resources from "./Resources";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Chart from "./Chart";
import TableOfAllScores from "./TableOfAllScores";
import AllResources from "./AllResources";
import axios from "axios";

function LandingPage({ myClassDarkMode }) {
	const navigate = useNavigate();
	const [finalScore, setFinalScore] = useState(0);

	useEffect(() => {
		axios
			.get("/api/percentage")
			.then((resp) => {
				if (resp.status === 200) {
					return resp.data;
				} else {
					throw new Error("Something is wrong");
				}
			})
			.then((data) => {
				setFinalScore(data[0]);
			});
	}, []);

	function handleChecklist() {
		navigate("/student");
	}
	function handleGoToProfile() {
		navigate("/user-profile");
	}
	return (
		<Container
			style={{
				marginTop: "30px",
				marginBottom: "30px",
				border: "1px solid grey",
				padding: "30px",
				borderRadius: "5px",
				boxShadow: "1px 3px 3px #888888",
			}}
			className={myClassDarkMode}
		>
			<Row>
				<Col
					sm={12}
					md={6}
					className={`d-flex justify-content-center ${myClassDarkMode}`}
				>
					<Card className={myClassDarkMode} style={{ marginTop: "30px" }}>
						<Card.Header as="h4" style={{ textAlign: "center" }}>
							Welcome to CYF Knowledge Checklist
						</Card.Header>
						<Card.Body>
							We are excited to help you track your learning progress and
							achieve your goals. Our mission is to provide you with the tools
							and resources you need to build your confidence and master new
							skills. On this page, you will find a progress chart that
							describes your progress in each skill and learning objective,
							along with the history of your confidence level. You will also
							find links to learning resources and coursework to better support
							you on your journey to learning new skills.
						</Card.Body>
					</Card>
				</Col>
				<Col
					sm={12}
					md={6}
					className={`d-flex justify-content-center ${myClassDarkMode}`}
				>
					<Resources
						myClassDarkMode={myClassDarkMode}
						finalScore={finalScore}
					/>
				</Col>
			</Row>
			<Row style={{ marginTop: "30px" }}>
				<Col className={`d-flex justify-content-center ${myClassDarkMode}`}>
					<Button variant="danger" onClick={handleGoToProfile}>
						View Profile
					</Button>
				</Col>
				<Col className={`d-flex justify-content-center ${myClassDarkMode}`}>
					<Button variant="danger" onClick={handleChecklist}>
						Go to Course Topic Checklist
					</Button>
				</Col>
			</Row>
			<Chart myClassDarkMode={myClassDarkMode} />
			<TableOfAllScores myClassDarkMode={myClassDarkMode} />
			<AllResources myClassDarkMode={myClassDarkMode} />
		</Container>
	);
}
export default LandingPage;
