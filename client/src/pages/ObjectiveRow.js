import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function ObjectiveRow({ objective, deleteObjective }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedObjective, setEditedObjective] = useState(objective.objective);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedObjective(objective.objective);
	};

	const handleSave = () => {
		// Make a PUT request to save the edited objective to the server
		setIsEditing(false);
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
					<>
						<button onClick={handleSave}>Save</button>
						<button onClick={handleCancel}>Cancel</button>
					</>
				) : (
					<>
						<button>
							<FaEdit style={{ color: "blue" }} onClick={handleEdit} />
						</button>
						<button onClick={() => deleteObjective(objective.objective_id)}>
							<FaTrash style={{ color: "red" }} />
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default ObjectiveRow;
