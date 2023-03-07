import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Skills from "./Skills";
import axios from "axios";
import UserScores from "./UserScores";
import Accordion from "react-bootstrap/Accordion";

function Student({ myClassDarkMode }) {
	const [skills, setSkills] = useState([]);
	const [selectedScore, setSelectedScore] = useState({});

	const handleSelectScore = (objectiveId, score) => {
		setSelectedScore({ ...selectedScore, [objectiveId]: score });
	};
	console.log(selectedScore);
	useEffect(() => {
		axios
			.get("/api/checklist")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => {
				setSkills(data);
			})
			.catch((error) => {
				console.error({ error: error.message });
			});
	}, []);
	//Save the selected scores for user id
	const saveSelectedScores = async () => {
		try {
			await axios
				.post("/api/scores", {
					selectedScores: selectedScore,
				})
				.then((res) => {
					if (res.status === 200) {
						return res.data;
					}
					throw new Error("Failed to save the score");
				})
				.then((data) => {
					alert(data.message);
					setSelectedScore({});
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container
			className={myClassDarkMode}
			style={{ marginTop: "50px", marginBottom: "200px" }}
		>
			<Row
				as="h1"
				style={{
					justifyContent: "center",
					color: "#DC143C",
					textShadow: "1px 1px 1px grey",
				}}
			>
				Course Topics Checklist
			</Row>
			<Accordion defaultActiveKey="0" className={myClassDarkMode}>
				<Accordion.Item eventKey="1" className={myClassDarkMode}>
					<Accordion.Header>
						<h5 style={{ color: "#DC143C", textShadow: "1px 1px 1px grey" }}>
							How to use this checklist
						</h5>
					</Accordion.Header>
					<Accordion.Body>
						Select your level of confidence with the score buttons next to each
						statement. Choosing the lowest score of 1 indicates you do not
						understand the topic well, and the highest score of 5 means you are
						confident about the topic. Similarly, the scores between 2-4
						indicate a different level of confidence that may need additional
						work.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Row className={myClassDarkMode}>
				{skills.map((skill) => (
					<Row key={skill.skill_name}>
						<Skills
							skill={skill}
							selectedScore={selectedScore}
							handleSelectScore={handleSelectScore}
							myClassDarkMode={myClassDarkMode}
						/>
					</Row>
				))}
			</Row>
			<div className={`d-flex justify-content-center ${myClassDarkMode}`}>
				<Button
					variant="danger"
					style={{ marginTop: "50px" }}
					className="mx-auto"
					onClick={saveSelectedScores}
				>
					Save & Submit
				</Button>
			</div>
			<UserScores myClassDarkMode={myClassDarkMode} />
		</Container>
	);
}

export default Student;
