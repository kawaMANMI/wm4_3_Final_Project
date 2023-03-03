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
	// profileId taken from the navigate object
	const profileId = location.state ? location.state.studentId : "";

	function handleChecklist() {
		navigate("/student");
	}
	const [userData, setUserData] = useState([]);
	const id = sessionStorage.getItem("userId");
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
	const picLink = `https://robohash.org/${id}.png`;
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
			<Row className={myClassDarkMode}>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Image
						src={picLink}
						roundedCircle
						style={{ background: "#8888", maxWidth: "40%" }}
						alt="profile picture"
					/>
				</Col>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Card style={{ width: "30rem", marginTop: "15px" }}>
						<Card.Header as="h4">User Profile</Card.Header>

						<ListGroup variant="flush">
							<ListGroup.Item>
								<strong>Name:</strong> {userData["name"]}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Username:</strong> {userData["username"]}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Class:</strong> {userData["class_code"]}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Region:</strong> {userData["region"]}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row style={{ marginTop: "30px" }}>
				<Col className="d-flex justify-content-center">
					<ListGroup.Item>
						<strong>Current Score Level:</strong>
					</ListGroup.Item>
				</Col>
				<Col className="d-flex justify-content-center">
					<Button variant="danger" onClick={handleChecklist}>
						Course Topic Checklist
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
		</Container>
	);
}

export default Profile;
