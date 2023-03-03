import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

function AllResources() {
	// const profileId = location.state ? location.state.studentId : "";
	const [resources, setResources] = useState([]);
	useEffect(() => {
		axios
			.get("/api/all-resources")
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
	console.log("Resources", resources);
	return (
		<Card style={{ marginTop: "30px" }}>
			<Card.Header className="card-header" as="h4">
				Extra Resources on the Skills
			</Card.Header>
			<Card.Body>
				<Card.Title>List of all Resources</Card.Title>
                <Card.Text>To be completed</Card.Text>
			</Card.Body>
		</Card>
	);
}
export default AllResources;
