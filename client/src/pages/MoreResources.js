import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ListGroup } from "react-bootstrap";

function MoreResources() {
	const { skill_id } = useParams();
	console.log(skill_id);
	const [resources, setResources] = useState([]);

	//Get the resources for the skill id
	useEffect(() => {
		axios
			.get(`/api/all-resources/${skill_id}`)
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
	}, [skill_id]);

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
						Resources
					</Card.Header>
					<ListGroup variant="flush">
						{resources.map((resource) => (
							<a
								href={resource.url}
								key={resource.id}
								style={{ textDecoration: "none" }}
							>
								<ListGroup.Item key={resource.title}>
									{resource.title}
								</ListGroup.Item>
							</a>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default MoreResources;
