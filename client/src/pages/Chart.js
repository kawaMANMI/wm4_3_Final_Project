import React, { useState, useEffect } from "react";
import { Card, Row, Col, Accordion } from "react-bootstrap";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";
import axios from "axios";

function Chart({ colorForIsDarkModeTable }) {
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
		<div style={{ marginBottom: "30px", ...colorForIsDarkModeTable }}>
			{skillScores.length === 0 ? (
				<span className="d-flex justify-content-center">Loading...</span>
			) : (
				<Row
					xs={1}
					md={2}
					className="g-4"
					style={{
						paddingLeft: "20px",
						paddingRight: "20px",
					}}
				>
					{Object.keys(skillScores[0])
						.slice(1)
						.map((key) => (
							<Col key={key} style={colorForIsDarkModeTable}>
								<Card
									style={{
										marginTop: "30px",
										boxShadow: "1px 3px 3px #888888",
									}}
								>
									<Accordion defaultActiveKey="0">
										<Accordion.Item
											eventKey="1"
											style={colorForIsDarkModeTable}
										>
											<Accordion.Header
												style={{ backgroundColor: "#d9534f !important" }}
											>
												<strong
													style={{
														textShadow: "1px 1px 1px grey",
													}}
												>
													{key.toUpperCase()}
												</strong>
											</Accordion.Header>
											<Accordion.Body>
												<LineChart
													className="d-flex justify-content-center"
													width={500}
													height={200}
													data={skillScores}
													syncId="anyId"
													margin={{
														top: 10,
														right: 70,
														left: 0,
														bottom: 0,
													}}
												>
													<CartesianGrid strokeDasharray="3 3" />
													<XAxis dataKey="date" />
													<YAxis />
													<Tooltip />
													<Line
														type="monotone"
														dataKey={key}
														stroke="#8884d8"
														fill="#8884d8"
													/>
												</LineChart>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</Card>
							</Col>
						))}
				</Row>
			)}
		</div>
	);
}
export default Chart;
