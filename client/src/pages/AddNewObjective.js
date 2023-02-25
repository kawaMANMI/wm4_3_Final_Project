import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function AddNewObjective({ handleSubmitObj }) {
	const [skill, setSkill] = useState("");
	const [obj, setObj] = useState("");

	function handleChangeSkill(e) {
		setSkill(e.target.value);
	}
	function handleChangeObj(e) {
		setObj(e.target.value);
	}

	const handleSubmitPost = async (e,skill_id, objective) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/learning_objectives", {
				skill_id: skill,
				objective: obj,
			});
			if (res.status === 200) {
				const newObjective = {
					skill_id: skill,
					objective: objective,
				};
				handleSubmitObj(newObjective);
				alert(res.data.message);
			} else {
				throw new Error("Failed to save the objective");
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div style={{ textAlign: "center" }}>
			<Form style={{ width: "18em" }} onSubmit={handleSubmitPost}>
				<h5 style={{ color: "red" }}>Add New Learning Objective</h5>
				<Form.Group className="mb-3">
					<Form.Label>Skill Id</Form.Label>
					<Form.Control
						required
						type="text"
						value={skill}
						onChange={handleChangeSkill}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Learning Objective</Form.Label>
					<Form.Control
						required
						type="text"
						value={obj}
						onChange={handleChangeObj}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}
export default AddNewObjective;
