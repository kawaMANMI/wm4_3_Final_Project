import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function LearningObjective() {
	const [learningObjective, setLearningObjective] = useState([]);

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

	const buttonStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: "10px",
	};

	return (
		<Container fluid>
			<Table bordered hover size="sm" responsive="md">
				<thead style={{ color: "#DC143C" }}>
					<tr>
						<th>#</th>
						<th>SKILLS</th>
						<th>LEARNING OBJECTIVES</th>
						{/* <th style={{ width: "15%" }}>ACTIONS</th> */}
					</tr>
				</thead>
				<tbody>
					{learningObjective.map((skill) => (
						<tr key={skill.skill_id}>
							<td>{skill.skill_id}</td>
							<td>{skill.skill_name}</td>
							<td>
								{skill.objectives.map((obj) => (
									<div key={obj.objective_id}>
										{obj.objective}
										<div style={buttonStyle}>
											<button style={{ color: "blue" }}>
												<FaEdit />
											</button>
											<button style={{ color: "red" }}>
												<FaTrash />
											</button>
										</div>
									</div>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
}

export default LearningObjective;
