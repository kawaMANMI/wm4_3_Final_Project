import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./LearningObj.css";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

function ObjectiveRow({ objective, onDelete, onSave, myClassDarkMode }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedObjective, setEditedObjective] = useState(objective.objective);
	const [isEditingEnabled, setIsEditingEnabled] = useState(true);

	const handleEdit = () => {
		if (isEditingEnabled) {
			setIsEditing(true);
		} else {
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedObjective(objective.objective);
	};
	// Make a PUT request to save the edited objective to the server
	const updateObjective = (id, editedObjective) => {
		setIsEditing(false);
		axios
			.put(`/api/learning_objectives/${id}`, {
				objective: editedObjective,
			})
			.then(() => {
				onSave();
			})
			.catch((error) => {
				console.error(error);
			});
	};
	useEffect(() => {
		const currentDate = new Date();
		const editDate = new Date("2023-04-04");
		if (currentDate >= editDate.getTime()) {
			setIsEditingEnabled(false);
		}
		if (currentDate < editDate.getTime()) {
			setIsEditingEnabled(true);
		}
	}, []);

	return (
		<Container fluid className={myClassDarkMode}>
			{isEditing ? (
				<input
					type="text"
					value={editedObjective}
					onChange={(e) => setEditedObjective(e.target.value)}
				/>
			) : (
				<Container className={myClassDarkMode}>{objective.objective}</Container>
			)}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					gap: "10px",
				}}
			>
				{isEditing ? (
					<div className={`button-container ${myClassDarkMode}`}>
						<Button
							disabled={!isEditingEnabled}
							variant="danger"
							onClick={() =>
								updateObjective(objective.objective_id, editedObjective)
							}
						>
							Save
						</Button>
						<Button onClick={handleCancel} variant="danger">
							Cancel
						</Button>
					</div>
				) : (
					<div>
						<Button
							disabled={!isEditingEnabled}
							className="btn btn-danger"
							style={{ marginRight: "10px" }}
						>
							<FaEdit style={{ color: "white" }} onClick={handleEdit} />
						</Button>
						<Button className="btn btn-danger" onClick={() => onDelete()}>
							<FaTrash style={{ color: "white" }} />
						</Button>
					</div>
				)}
			</div>
		</Container>
	);
}

export default ObjectiveRow;
