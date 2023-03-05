import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import ObjectiveRow from "./ObjectiveRow";
import AddNewObjective from "./AddNewObjective";
import "./LearningObj.css";
import { Button } from "react-bootstrap";

function LearningObjective() {
	const [learningObjective, setLearningObjective] = useState([]);
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};
	function handleSubmitObj(newObjective) {
		setLearningObjective((prevState) => [...prevState, newObjective]);
	}

	function getLearningObj() {
		axios
			.get("/api/checklist")
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
	}
	useEffect(() => {
		getLearningObj();
	}, []);

	const deleteObjective = (id) => {
		fetch(`/api/learning_objectives/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			getLearningObj();
		});
	};

	return (
		<div className="learning-objective-wrapper">
			<Button
				style={{ width: "7em", height: "4em", margin: "2em" }}
				className="btn btn-danger"
				onClick={toggleVisibility}
			>
				Add Objective
			</Button>
			<div>
				{isVisible && <AddNewObjective handleAddObjective={handleSubmitObj} />}
			</div>
			<Container fluid className="learning-objective-container">
				<div>
					<h2 style={{ color: "rgb(220,53,69)" }}>
						Skill and Learning Objectives
					</h2>
					<Table hover size="sm" responsive="sm" className="table-responsive">
						<thead>
							<tr>
								<th
									style={{
										padding: "2em",
										color: "rgb(255,255,255)",
										fontSize: "20px",
									}}
								>
									SKILLS
								</th>
								<th
									style={{
										padding: "2em",
										color: "rgb(255,255,255)",
										fontSize: "20px",
									}}
								>
									LEARNING OBJECTIVES
								</th>
							</tr>
						</thead>
						<tbody>
							{learningObjective.map((skill) =>
								skill.objectives.map((objective) => (
									<tr key={objective.objective_id}>
										<td>{skill.skill_name}</td>
										<td>
											<ObjectiveRow
												onChange={getLearningObj}
												objective={objective}
												onDelete={() => deleteObjective(objective.objective_id)}
											/>
										</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
				</div>
			</Container>
		</div>
	);
}

export default LearningObjective;
