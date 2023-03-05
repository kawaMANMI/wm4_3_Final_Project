import React, { useState, useEffect } from "react";
import { Card, Row, Col, Accordion } from "react-bootstrap";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";
import axios from "axios";
import "./Chart.css";

function Chart({ myClassDarkMode }) {
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
		<div className={myClassDarkMode} style={{ marginBottom: "30px" }}>
			{skillScores.length === 0 ? (
				<span
					className="d-flex justify-content-center"
					style={{ fontSize: "1.2rem" }}
				>
					Sorry there is no data...
				</span>
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
							<Col key={key}>
								<Card
									className={myClassDarkMode}
									style={{
										marginTop: "30px",
										boxShadow: "1px 3px 3px #888888",
									}}
								>
									<Accordion defaultActiveKey="0" className={myClassDarkMode}>
										<Accordion.Item eventKey="1" className={myClassDarkMode}>
											<Accordion.Header style={{ border: "red" }}>
												<strong
													style={{
														textShadow: "1px 1px 1px grey",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														flexWrap: "wrap",
														maxWidth: "100%",
													}}
												>
													{key.toUpperCase()}
												</strong>
											</Accordion.Header>
											<Accordion.Body>
												<ResponsiveContainer width="100%" height={200}>
													<LineChart
														className="d-flex justify-content-center"
														data={skillScores}
														syncId="anyId"
														margin={{
															top: 10,
															right: 20,
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
												</ResponsiveContainer>
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
