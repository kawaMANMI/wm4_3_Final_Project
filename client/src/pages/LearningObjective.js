import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import ObjectiveRow from "./ObjectiveRow";
import AddNewObjective from "./AddNewObjective";
import "./LearningObj.css";
import { Button } from "react-bootstrap";
import { Card, ListGroup } from "react-bootstrap";

function LearningObjective({ myClassDarkMode }) {
	const [learningObjective, setLearningObjective] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};
	function handleRefresh() {
		setRefresh(!refresh);
	}
	function getLearningObj() {
		axios
			.get("/api/checklist")
			.then((res) => setLearningObjective(res.data))
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
	const getUniqueSkills = () => {
		return [...new Set(learningObjective.map((skill) => skill.skill_name))];
	};

	return (
		<Card
			style={{
				marginTop: "30px",
				marginBottom: "20px",
				marginRight: "5em",
				marginLeft: "5em",
				boxShadow: "1px 3px 3px #888888",
			}}
			className={myClassDarkMode}
		>
			<div className={`learning-objective-wrapper ${myClassDarkMode}`}>
				<div className="toggle-container">
					<div>
						<Button
							style={{
								width: "7em",
								height: "4em",
								margin: "2em",
								display: "flex",
								direction: "column",
							}}
							className="btn btn-danger"
							onClick={toggleVisibility}
						>
							Add Objective
						</Button>
					</div>

					<div>
						{isVisible && (
							<AddNewObjective
								myClassDarkMode={myClassDarkMode}
								handleRefresh={handleRefresh}
								setLearningObjective={setLearningObjective}
								learningObjective={learningObjective}
							/>
						)}
					</div>
				</div>

				<Container
					fluid
					className={`learning-objective-container ${myClassDarkMode}`}
				>
					<div>
						<Card.Header
							className={"card-header "}
							as="h4"
							style={{
								textAlign: "center",
								marginTop: "2em",
								marginBottom: "2em",
							}}
						>
							Skills and Learning Objectives
						</Card.Header>

						<ListGroup className={`list-group-flush ${myClassDarkMode}`}>
							{getUniqueSkills().map((skillName, index) => {
								const skillObjectives = learningObjective
									.filter((skill) => skill.skill_name === skillName)
									.flatMap((skill) => skill.objectives);

								return (
									<ListGroup.Item key={index} className={myClassDarkMode}>
										<h5
											className={"card-header "}
											style={{
												textAlign: "center",
												marginTop: "2em",
												marginBottom: "2em",
											}}
										>
											{skillName}
										</h5>
										<ListGroup className={myClassDarkMode}>
											{skillObjectives.map((objective, index) => (
												<ObjectiveRow
													key={index}
													onSave={() => getLearningObj()}
													objective={objective}
													onDelete={() =>
														deleteObjective(objective.objective_id)
													}
													myClassDarkMode={myClassDarkMode}
												/>
											))}
										</ListGroup>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</div>
				</Container>
			</div>
		</Card>
	);
}

export default LearningObjective;
