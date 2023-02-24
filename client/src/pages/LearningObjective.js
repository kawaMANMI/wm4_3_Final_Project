import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import ObjectiveRow from "./ObjectiveRow";
import AddNewObjective from "./AddNewObjective";

function LearningObjective() {
	const [learningObjective, setLearningObjective] = useState([]);
	
	
	function handleSubmitObj(newObjective) {
		setLearningObjective((prevState) => [...prevState, newObjective]);
	}
	useEffect(() => {
		axios
			.get("/api/skills")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => setLearningObjective(data))
			.catch((error) => {
				console.log({ error: error.message });
			});
	}, []);

	const deleteObjective = (id) => {
		fetch(`api/learning_objectives/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((data) => {
			setLearningObjective(data);
		});
	};

	return (
		<Container
			fluid
			style={{ display: "flex", justifyContent: "space-between" }}
		>
			<AddNewObjective handleAddObjective={handleSubmitObj} />
			<Table bordered hover size="sm" responsive="md" style={{ width: "65em" }}>
				<thead style={{ color: "red", textAlign: "center" }}>
					<tr>
						<th>SKILL ID</th>
						<th>SKILLS</th>
						<th>LEARNING OBJECTIVES</th>
					</tr>
				</thead>
				<tbody>
					{learningObjective.map((skill) =>
						skill.objectives.map((objective) => (
							<tr key={objective.objective_id}>
								<td>{skill.skill_id}</td>
								<td style={{ textAlign: "center", fontWeight: "bold" }}>
									{skill.skill_name}
								</td>
								<td>
									<ObjectiveRow
										objective={objective}
										deleteObjective={deleteObjective}
									/>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</Container>
	);
}

export default LearningObjective;
