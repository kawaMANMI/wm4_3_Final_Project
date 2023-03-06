import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Resources() {
	const profileId = location.state ? location.state.studentId : "";
	const [resources, setResources] = useState([]);
	// const id = sessionStorage.getItem("userId");
	useEffect(() => {
		axios
			.get(`/api/resources/${profileId}`)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Something is wrong");
				}
			})
			.then((data) => {
				setResources(data);
			})
			.catch((e) => console.log({ error: e.message }));
	}, [profileId]);
	console.log("Resources", resources);
	return (
		<Card style={{ marginTop: "30px" }}>
			<Card.Header className="card-header" as="h4">
				Current Score Level
			</Card.Header>
			<Card.Body>
				<Card.Title>Recommended Resources</Card.Title>
				<Card.Text>
					Based on your current score level, we recommend the following
					resources:
				</Card.Text>
				<ListGroup variant="flush">
					{resources.map((variant) => (
						<a href={variant.url} key={variant.url}>
							<ListGroup.Item key={variant.title}>
								{variant.title}
							</ListGroup.Item>
						</a>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
}
export default Resources;
