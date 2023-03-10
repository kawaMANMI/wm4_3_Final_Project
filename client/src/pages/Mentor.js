import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mentor.css";
import { Container, Card, Table, Button } from "react-bootstrap";
import RegionDropdown from "./RegionDropdown";
import ClassCodeDropdown from "./ClassCodeDropdown";

function Mentor({ myClassDarkMode }) {
	const navigate = useNavigate();
	function handleUser(student_id) {
		navigate(`/user-profile/${student_id}`, {
			state: { studentId: student_id },
		});
	}
	const [scores, setScores] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState("");
	const [isAscending, setIsAscending] = useState(true);
	const [selectedClassCode, setSelectedClassCode] = useState("");
	const [sortScores, setSortScores] = useState("");

	useEffect(() => {
		axios
			.get(
				`api/skills-by-region?region=${selectedRegion}&classCode=${selectedClassCode}`
			)
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => setScores(data))
			.catch((error) => {
				console.log({ error: error.message });
			});
	}, [selectedRegion, selectedClassCode]);

	const filteredScores = selectedClassCode
		? scores.filter((score) => score.class_code === selectedClassCode)
		: scores;

	let sortedStudentNames = Object.values(filteredScores).sort((a, b) => {
		return a.student_name.localeCompare(b.student_name);
	});
	// Sort by total score
	if (sortScores === "total_score") {
		sortedStudentNames.sort((a, b) => {
			return isAscending
				? a.total_score - b.total_score
				: b.total_score - a.total_score;
		});
	}
	const sortByTotalScore = () => {
		setIsAscending(!isAscending);
		setSortScores("total_score");
	};
	// const sortByName = () => {
	// 	const sortedScores = [...scores];
	// 	if (isAscending) {
	// 		sortedScores.sort((a, b) => a.student_name.localeCompare(b.student_name));
	// 	} else {
	// 		sortedScores.sort((a, b) => b.student_name.localeCompare(a.student_name));
	// 	}
	// 	setScores(sortedScores);
	// 	setIsAscending(!isAscending);
	// };

	return (
		<Container className={`border-0 ${myClassDarkMode}`}>
			<div
				className="button_container"
				style={{ justifyContent: "space-around" }}
			>
				<RegionDropdown
					setSelectedRegion={setSelectedRegion}
					selectedRegion={selectedRegion}
				/>
				<ClassCodeDropdown
					setSelectedClassCode={setSelectedClassCode}
					selectedClassCode={selectedClassCode}
				/>
			</div>
			<Card
				style={{
					marginTop: "30px",
					marginBottom: "20px",
					boxShadow: "1px 3px 3px #888888",
				}}
				className={myClassDarkMode}
			>
				<Card.Header
					className="card-header"
					as="h4"
					style={{
						textAlign: "center",
					}}
				>
					STUDENTS LIST
				</Card.Header>
				<Table className={myClassDarkMode} bordered hover responsive>
					<thead>
						<tr style={{ color: "#DC143C", textAlign: "center" }}>
							<th>Name</th>
							<th>Class</th>
							<th>HTML/CSS</th>
							<th>GIT</th>
							<th>JAVASCRIPT</th>
							<th>REACT</th>
							<th>NODE</th>
							<th>DATABASE_POSTGRES</th>
							<th onClick={sortByTotalScore}>
								Total score {isAscending ? "▲" : "▼"}
							</th>
							<th>Profile</th>
						</tr>
					</thead>
					<tbody>
						{sortedStudentNames.map((score, index) => (
							<tr key={index}>
								<td>{score.student_name}</td>
								<td>{score.class_code}</td>
								<td>{score.html_css ? score.html_css : 0}</td>
								<td>{score.git ? score.git : 0}</td>
								<td>{score.javascript ? score.javascript : 0}</td>
								<td>{score.react ? score.react : 0}</td>
								<td>{score.node ? score.node : 0}</td>
								<td>{score.database_postgres ? score.database_postgres : 0}</td>
								<td>{score.total_score ? score.total_score : 0}</td>
								<td style={{ textAlign: "center" }}>
									<Button
										variant="link"
										onClick={() => handleUser(score.student_id)}
										style={{ color: "red" }}
									>
										View More
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card>
		</Container>
	);
}
export default Mentor;
