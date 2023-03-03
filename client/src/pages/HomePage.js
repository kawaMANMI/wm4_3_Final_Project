import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";

function HomePage() {
	const navigate = useNavigate();
	function handleLogin() {
		navigate("/login");
	}
	return (
		<div className="home-page">
			<Container>
				<Row>
					<Col lg="6" md="6" xs="12" className="d-flex align-items-center">
						<div className="hero_content">
							<h1 className="mb-4">
								CodeYourFuture <br /> Knowledge Checklist
								<br />
							</h1>
							<strong
								style={{ color: "white", fontSize: "1.2rem" }}
								className="mb-4"
							>
								Track your learning progress & achieve your goals
							</strong>
							<Button variant="danger" onClick={handleLogin}>
								Get Started
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default HomePage;
