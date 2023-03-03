import React from "react";
import Resources from "./Resources";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
} from "react-bootstrap";
import Chart from "./Chart";
import TableOfAllScores from "./TableOfAllScores";
import AllResources from "./AllResources";

function LandingPage() {
    const navigate = useNavigate();

    function handleChecklist() {
		navigate("/student");
    }
    function handleGoToProfile() {
        navigate("/user-profile");
    }
  return (
		<Container
			style={{
				border: "1px solid grey",
				padding: "30px",
				width: "70rem",
				borderRadius: "5px",
				boxShadow: "1px 3px 3px #888888",
			}}
		>
			<Row>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Card style={{ marginTop: "30px" }}>
                        <Card.Header className="card-header" as="h4">Welcome to CodeYourFuture Knowledge Checklist</Card.Header>
                        <Card.Body>We are excited to help you track your learning progress and achieve your goals. Our mission is to provide you with the tools and resources you need to build your confidence and master new skills. On this page, you will find a progress chart that describes your progress in each skill and learning objective, along with the history of your confidence level. You will also find links to learning resources and coursework to better support  you on your journey to learning new skills.</Card.Body>
                    </Card>
				</Col>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Resources />
				</Col>
			</Row>
			<Row style={{ marginTop: "30px" }}>
				<Col className="d-flex justify-content-center">
                    <Button variant="danger" onClick={handleGoToProfile}>View Profile</Button>
				</Col>
				<Col className="d-flex justify-content-center">
					<Button variant="danger" onClick={handleChecklist}>
						Go to Course Topic Checklist
					</Button>
				</Col>
			</Row>
			<Card style={{ marginTop: "30px" }}>
				<Card.Header
					className="card-header"
					as="h4"
					style={{
						textAlign: "center",
					}}
				>
					Progress Chart
				</Card.Header>
				<Chart />
			</Card>
			<TableOfAllScores />
            <AllResources />
		</Container>
	);
}

export default LandingPage;