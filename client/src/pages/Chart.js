import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";
import axios from "axios";

function Chart() {
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
	console.log(skillScores);
	return (
		<div style={{ marginBottom: "200px" }}>
			{skillScores.length === 0 ? (
				<div>Loading...</div>
			) : (
				<Row
					xs={1}
					md={2}
					className="g-4"
					style={{ paddingLeft: "20px", paddingRight: "20px" }}
				>
					{Object.keys(skillScores[0])
						.slice(1)
						.map((key) => (
							<Col key={key}>
								<Card
									style={{
										marginTop: "30px",
										boxShadow: "1px 3px 3px #888888",
									}}
								>
									<Card.Body>
										<Card.Header
											className="d-flex justify-content-center"
											as="strong"
											style={{
												textAlign: "center",
											}}
										>
											{key.toUpperCase()}
										</Card.Header>
										<LineChart
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
									</Card.Body>
								</Card>
							</Col>
						))}
				</Row>
				// </div>
			)}
		</div>
	);
}
export default Chart;
