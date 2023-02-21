import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

function TableOfScores({ userId }) {
	const [recentScores, setRecentScores] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/recent-scores/${userId}`)
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
	}, [userId]);

	return (
		<div style={{ marginLeft: "auto", marginRight: "auto" }}>
			<Table striped bordered hover>
				<thead>
					<tr>
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
