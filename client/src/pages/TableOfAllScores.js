import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Accordion } from "react-bootstrap";

function TableOfAllScores({ colorForIsDarkModeTable }) {
	const [skillScores, setSkillScores] = useState([]);

	useEffect(() => {
		axios
			.get("/api/all-scores")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => {
				setSkillScores(data);
			})
			.catch((error) => {
				console.error({ error: error.message });
			});
	}, []);

	return (
		<Card
			style={{
				marginTop: "30px",
				marginBottom: "200px",
				boxShadow: "1px 3px 3px #888888",
				...colorForIsDarkModeTable,
			}}
		>
			<Card.Header
				className="card-header"
				as="h4"
				style={{
					textAlign: "center",
					...colorForIsDarkModeTable,
				}}
			>
				Scores Table
			</Card.Header>
			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="1" style={colorForIsDarkModeTable}>
					<Accordion.Header>
						<strong
							style={{
								color: "#DC143C",
								textShadow: "1px 1px 1px grey",
								colorForIsDarkModeTable,
							}}
						>
							CHECK YOUR SCORES PER SKILLS
						</strong>
					</Accordion.Header>
					<Accordion.Body className="d-flex justify-content-center">
						<Table
							striped
							bordered
							hover
							style={{
								boxShadow: "5px 10px 8px #888888",
								borderRadius: "5px",
								marginBottom: "20PX",
								...colorForIsDarkModeTable,
							}}
						>
							<thead>
								<tr style={{ color: "#DC143C", ...colorForIsDarkModeTable }}>
									<th>#</th>
									<th>Date</th>
									<th>HTML/CSS</th>
									<th>GIT</th>
									<th>JAVASCRIPT</th>
									<th>REACT</th>
									<th>NODE</th>
									<th>DATABASE_POSTGRES</th>
								</tr>
							</thead>
							<tbody style={colorForIsDarkModeTable}>
								{skillScores.map((score, index) => (
									<tr key={index} style={colorForIsDarkModeTable}>
										<td style={colorForIsDarkModeTable}>{index + 1}</td>
										<td style={colorForIsDarkModeTable}>{score.date}</td>
										<td style={colorForIsDarkModeTable}>{score.html_css}</td>
										<td style={colorForIsDarkModeTable}>{score.git}</td>
										<td style={colorForIsDarkModeTable}>{score.javascript}</td>
										<td style={colorForIsDarkModeTable}>{score.react}</td>
										<td style={colorForIsDarkModeTable}>{score.node}</td>
										<td style={colorForIsDarkModeTable}>
											{score.database_postgres}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Card>
	);
}

export default TableOfAllScores;
