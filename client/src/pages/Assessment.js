import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ListGroup } from "react-bootstrap";

function Assessment() {
	const { skill_name, skill_id } = useParams();
	console.log(skill_id);
	const [assessment, setAssessment] = useState([]);

	//Get the assessment for the skill id
	useEffect(() => {
		axios
			.get(`/api/assessment/${skill_name}/${skill_id}`)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Something is wrong");
				}
			})
			.then((data) => {
				setAssessment(data);
			})
			.catch((e) => console.log({ error: e.message }));
	}, [skill_name, skill_id]);

	return (
		<Container>
			<Card
				style={{
					marginTop: "15px",
					boxShadow: "1px 3px 3px #888888",
				}}
			>
				<Card.Body>
					<Card.Header
						as="h4"
						style={{
							color: "#DC143C",
							textShadow: "1px 1px 1px grey",
							textAlign: "center",
						}}
					>
						{skill_name.toUpperCase()}-Assessment
					</Card.Header>
					<ListGroup variant="flush">
						{assessment.map((data, index) => (
							<a
								href={data.coursework}
								key={data.id}
								style={{ textDecorationColor: "#DC143C" }}
							>
								<ListGroup.Item key={data.id}>
									Assessment-{index + 1}
								</ListGroup.Item>
							</a>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Assessment;
