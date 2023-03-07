import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./LearningObj.css";
import { Container, Button } from "react-bootstrap";

function AddNewObjective({
	handleRefresh,
	myClassDarkMode,
	setLearningObjective,
	learningObjective,
}) {
	const [obj, setObj] = useState("");
	const [selectedOption, setSelectedOption] = useState("option1");
	const handleOptionChange = (event) => setSelectedOption(event.target.value);
	const listSkills = [
		"HTML/CSS",
		"GIT",
		"JavaScript",
		"React",
		"Node",
		"Database-Postgres",
	];
	function handleChangeObj(e) {
		setObj(e.target.value);
	}

	const handleSubmitPost = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/learning_objectives", {
				skill_id: selectedOption.slice(-1),
				objective: obj,
			});
			if (res.status === 200) {
				// const newObjective = {
				// 	skill_id: selectedOption.slice(-1),
				// 	objective: obj,
				// };
				handleRefresh();

				alert(res.data.message);
				const dd = {
					skill_id: parseInt(selectedOption.slice(-1)),
					skill_name: listSkills[selectedOption.slice(-1) - 1],
					objectives: [
						{ objective: obj },
						...learningObjective[selectedOption.slice(-1) - 1].objectives,
					],
				};
				learningObjective[selectedOption.slice(-1) - 1] = dd;
				setLearningObjective(learningObjective);
			} else {
				throw new Error("Failed to save the objective");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container
			style={{
				border: "1px solid grey",
				borderRadius: "5px",
				boxShadow: "1px 3px 3px #888888",
			}}
			className={myClassDarkMode}
		>
			<Form onSubmit={handleSubmitPost}>
				<DropdownButton
					variant="danger"
					id="dropdown-basic-button"
					title={listSkills[selectedOption.slice(-1) - 1]}
				>
					<Dropdown.Item
						onClick={() => handleOptionChange({ target: { value: "option1" } })}
					>
						HTML
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => handleOptionChange({ target: { value: "option2" } })}
					>
						GIT
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => handleOptionChange({ target: { value: "option3" } })}
					>
						JAVASCRIPT
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => handleOptionChange({ target: { value: "option4" } })}
					>
						REACT
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => handleOptionChange({ target: { value: "option5" } })}
					>
						NODE
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => handleOptionChange({ target: { value: "option6" } })}
					>
						POSTGRES
					</Dropdown.Item>
				</DropdownButton>

				<Form.Group className="mb-3">
					<Form.Control
						className={`form-control ${myClassDarkMode}`}
						style={{ marginTop: "1em" }}
						required
						placeholder=" New Learning Objective"
						type="text"
						value={obj}
						onChange={handleChangeObj}
					/>
				</Form.Group>
				<Button
					variant="danger"
					type="submit"
					style={{ marginBottom: "1em", width: "15em" }}
				>
					Submit Objective
				</Button>
			</Form>
		</Container>
	);
}
export default AddNewObjective;
