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
		fetch(`api/learning_objectives/${id}`, {
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
			<div className="learning-objective-flex-row">
				<Button
					className="btn btn-danger"
					style={{ marginLeft: "1em" }}
					onClick={toggleVisibility}
				>
					Add Objective
				</Button>
				{isVisible && <AddNewObjective handleAddObjective={handleSubmitObj} />}
			</div>
			<Container fluid className="learning-objective-container">
				<div>
					<Table hover size="sm" responsive="sm" className="table-responsive">
						<thead>
							<tr>
								<th
									style={{
										padding: "2em",
										textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
										fontSize: "20px",
									}}
								>
									SKILLS
								</th>
								<th
									style={{
										padding: "2em",
										textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
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
