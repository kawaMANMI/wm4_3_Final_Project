import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./UsersProfile.css";

import {
	Container,
	Row,
	Col,
	Image,
	Card,
	ListGroup,
	Button,
} from "react-bootstrap";
import Chart from "./Chart";
import TableOfAllScores from "./TableOfAllScores";

function Profile({ myClassDarkMode }) {
	const navigate = useNavigate();
	const location = useLocation();
	const profileId = location.state ? location.state.studentId : "";
	const [finalScore, setFinalScore] = useState(0);

	useEffect(() => {
		axios
			.get(`/api/percentage/${profileId}`)
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
	}, [profileId]);

	function handleChecklist() {
		navigate("/student");
	}

	const [userData, setUserData] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/user-profile/${profileId}`)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Something is wrong");
				}
			})
			.then((data) => {
				setUserData(data[0]);
			})
			.catch((e) => console.log({ error: e.message }));
	}, [profileId]);

	const picLink = `https://robohash.org/${userData.id}.png`;
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
			<Row className={myClassDarkMode}>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Image
						src={picLink}
						roundedCircle
						style={{ background: "#8888", maxWidth: "40%" }}
						alt="profile picture"
						crossOrigin="anonymous"
					/>
				</Col>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Card
						className={myClassDarkMode}
						style={{ width: "30rem", marginTop: "15px" }}
					>
						<Card.Header as="h4">User Profile</Card.Header>

						<ListGroup variant="flush" className={myClassDarkMode}>
							<ListGroup.Item className={myClassDarkMode}>
								<strong>Name:</strong> {userData["name"]}
							</ListGroup.Item>
							<ListGroup.Item className={myClassDarkMode}>
								<strong>Username:</strong> {userData["username"]}
							</ListGroup.Item>
							<ListGroup.Item className={myClassDarkMode}>
								<strong>Class:</strong> {userData["class_code"]}
							</ListGroup.Item>
							<ListGroup.Item className={myClassDarkMode}>
								<strong>Region:</strong> {userData["region"]}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			{!userData["role"] !== "Mentor" ? (
				<>
					<Row style={{ marginTop: "30px" }}>
						<Col className="d-flex justify-content-center">
							<ListGroup.Item>
								<strong>
									Current Score Level:
									{finalScore["percentage"] === null
										? 0
										: finalScore["percentage"]}
									%
								</strong>
							</ListGroup.Item>
						</Col>
						<Col className="d-flex justify-content-center">
							<Button variant="danger" onClick={handleChecklist}>
								Course Topic Checklist
							</Button>
						</Col>
					</Row>
					<Chart myClassDarkMode={myClassDarkMode} />
					<TableOfAllScores myClassDarkMode={myClassDarkMode} />
				</>
			) : null}
		</Container>
	);
}

export default Profile;
