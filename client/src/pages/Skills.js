import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
function getClassName(score, selectedScore) {
	if (score === selectedScore) {
		switch (score) {
			case 1:
				return "danger";
			case 2:
			case 3:
			case 4:
				return "warning";
			case 5:
				return "success";
		}
	} else {
		return "outline-secondary";
	}
}
function Skills({ skill, selectedScore, handleSelectScore }) {
	return (
		<Card style={{ width: "100rem", marginTop: "15px" }}>
			<Card.Body>
				<Card.Header as="h4" style={{ color: "#DC143C" }}>
					{skill.skill_name}
				</Card.Header>
				<ListGroup variant="flush">
					{skill.objectives.map((obj) => (
						<ListGroup.Item key={obj.objective_id}>
							{obj.objective}
							<div style={{ float: "right" }}>
								{[1, 2, 3, 4, 5].map((score) => (
									<Button
										style={{ marginLeft: "10px" }}
										key={score}
										variant={getClassName(
											score,
											selectedScore[obj.objective_id]
										)}
										onClick={() => handleSelectScore(obj.objective_id, score)}
									>
										{score}
									</Button>
								))}
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
}

export default Skills;
