import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

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
		<div style={{ marginLeft: "auto", marginRight: "auto" }}>
			<h3
				style={{
					color: "#DC143C",
					textAlign: "center",
					marginBottom: "20px",
					textShadow: "1px 1px 1px grey",
				}}
			>
				Your recent scores for each skill
			</h3>
			<Table
				className={myClassDarkMode}
				bordered
				hover
				style={{ boxShadow: "5px 10px 8px #888888", borderRadius: "5px" }}
			>
				<thead>
					<tr style={{ color: "#DC143C" }}>
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
		</div>
	);
}

export default TableOfScores;
