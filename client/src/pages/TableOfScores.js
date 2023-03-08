import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

function TableOfScores({ myClassDarkMode }) {
	const [recentScores, setRecentScores] = useState([]);

	useEffect(() => {
		axios
			.get("/api/recent-scores")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => {
				setRecentScores(data);
			})
			.catch((error) => {
				console.error({ error: error.message });
			});
	}, []);

	return (
		<Card
			style={{
				margin: "30px",
				boxShadow: "1px 3px 3px #888888",
			}}
			className={myClassDarkMode}
		>
			<Card.Header
				className={"card-header "}
				as="h4"
				style={{
					textAlign: "center",
				}}
			>
				Your recent scores for each skill
			</Card.Header>

			<Table
				responsive
				className={myClassDarkMode}
				bordered
				hover
				style={{ borderRadius: "5px" }}
			>
				<thead>
					<tr style={{ color: "#DC143C", textAlign: "center" }}>
						<th>#</th>
						<th>Skills</th>
						<th>Average Scores</th>
					</tr>
				</thead>
				<tbody>
					{recentScores.map((score, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{score.skill_name}</td>
							<td>{score.average_score}</td>
						</tr>
					))}
				</tbody>
			</Table>
			{/* </div> */}
		</Card>
	);
}

export default TableOfScores;
