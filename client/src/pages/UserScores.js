import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TableOfScores from "./TableOfScores";

function UserScores({ myClassDarkMode }) {
	const [showToS, setShowToS] = useState(false);

	const handleShowToS = () => {
		setShowToS(!showToS);
	};

	return (
		<div>
			<div className="d-flex justify-content-center">
				<Button
					variant="success"
					style={{ marginTop: "20px", marginBottom: "10px" }}
					className="mx-auto"
					onClick={handleShowToS}
				>
					{!showToS ? "Check your Scores" : "Hide your scores"}
				</Button>
			</div>
			{showToS && <TableOfScores myClassDarkMode={myClassDarkMode} />}
		</div>
	);
}

export default UserScores;
