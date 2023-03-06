import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Resources({ finalScore }) {
	const [resources, setResources] = useState([]);

	useEffect(() => {
		axios
			.get("/api/resources")
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
	}, []);

	return (
		<Card style={{ marginTop: "30px" }}>
			<Card.Header
				className="card-header"
				as="h4"
				style={{
					textAlign: "center",
				}}
			>
				Current Score Level:
				{finalScore["percentage"] === null ? 0 : finalScore["percentage"]}%
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
								{variant.title}({variant.reading_time}min)
							</ListGroup.Item>
						</a>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
}
export default Resources;
