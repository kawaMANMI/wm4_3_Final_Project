import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./LearningObj.css";

function ObjectiveRow({ objective, onDelete, onChange }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedObjective, setEditedObjective] = useState(objective.objective);
	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedObjective(objective.objective);
	};
	// Make a PUT request to save the edited objective to the server
	const updateObjective = (id) => {
		fetch(`/api/learning_objectives/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ objective: editedObjective }),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to update learning objective");
				}
			})
			.then(() => {
				setIsEditing(false);
				onChange();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				margin: "1em",
			}}
		>
			{isEditing ? (
				<input
					type="text"
					value={editedObjective}
					onChange={(e) => setEditedObjective(e.target.value)}
				/>
			) : (
				<div>{objective.objective}</div>
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
					<div className="button-container">
						<button
							onClick={updateObjective(objective.objective_id, editedObjective)}
						>
							Save
						</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				) : (
					<div>
						<button style={{ marginRight: "10px" }}>
							<FaEdit style={{ color: "007BFF" }} onClick={handleEdit} />
						</button>
						<button onClick={() => onDelete()}>
							<FaTrash style={{ color: "red" }} />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ObjectiveRow;
