import React, { useState } from "react";
import axios from "axios";


function AddNewObjective({ handleAddObjective }) {
	const [skill, setSkill] = useState("");
	const [obj, setObj] = useState("");

	function handleChangeSkill(e) {
		setSkill(e.target.value);
	}
	function handleChangeObj(e) {
		setObj(e.target.value);
	}

	const handleSubmitPost = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/learning_objectives", {
				skill,
				obj,
			});
			if (res.status === 200) {
				const newObjective = {
					skill_id: skill,
					objectives: [{ objective_name: obj }],
				};
				handleAddObjective(newObjective);
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
			<h3>Add New Learning Objective</h3>
			<form onSubmit={handleSubmitPost}>
				<label>
					Skill ID :
					<input
						onChange={handleChangeSkill}
						style={{
							color: "black",
							borderRadius: 10,
						}}
						required=""
						type="text"
						value={skill}
					/>
				</label>
				<label>
					Objective Name:
					<input
						onChange={handleChangeObj}
						style={{
							color: "black",
							borderRadius: 10,
						}}
						required=""
						type="text"
						value={obj}
					/>
				</label>
			</form>
			<button
				className="btn btn-outline-success"
				type="submit"
				form="form1"
				value="Submit"
				style={{ width: "6em" }}
			>
				Submit
			</button>
		</div>
	);
}
export default AddNewObjective;
