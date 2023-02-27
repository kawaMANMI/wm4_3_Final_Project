import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TableOfScores from "./TableOfScores";

function UserScores() {
	const [showToS, setShowToS] = useState(false);

	const handleShowToS = () => {
		setShowToS(true);
	};

	return (
		<div>
			<div className="d-flex justify-content-center">
				<Button
					variant="success"
					style={{ marginTop: "20px", marginBottom: "50px" }}
					className="mx-auto"
					onClick={handleShowToS}
				>
					Check your Scores
				</Button>
			</div>
			{showToS && <TableOfScores />}
		</div>
	);
}

export default UserScores;
