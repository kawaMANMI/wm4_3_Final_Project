import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Mentor.css";
import { Container } from "react-bootstrap";
import RegionDropdown from "./RegionDropdown";
import ClassCodeDropdown from "./ClassCodeDropdown";
import { Card, Table } from "react-bootstrap";

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

	const uniqueSkills = filteredScores
		.map((score) => score.skill_name)
		.filter((value, index, array) => array.indexOf(value) === index);
	const studentScores = {};
	scores.forEach(
		({ student_id, student_name, class_code, skill_name, total_score }) => {
			if (student_id in studentScores) {
				studentScores[student_id].totalScore =
					Number(studentScores[student_id].totalScore) + Number(total_score);
				studentScores[student_id].skills[skill_name] = total_score;
			} else {
				studentScores[student_id] = {
					student_id: student_id,
					class_code: class_code,
					name: student_name,
					total_score: total_score,
					skills: { [skill_name]: total_score },
				};
			}
		}
	);
	let sortedStudentNames = Object.values(studentScores).sort((a, b) => {
		return a.name.localeCompare(b.name);
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
	const sortByName = () => {
		const sortedScores = [...scores];
		if (isAscending) {
			sortedScores.sort((a, b) => a.student_name.localeCompare(b.student_name));
		} else {
			sortedScores.sort((a, b) => b.student_name.localeCompare(a.student_name));
		}
		setScores(sortedScores);
		setIsAscending(!isAscending);
	};

	return (
		<Container
			fluid
			responsive="sm"
			className={`table_container ${myClassDarkMode}`}
		>
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
					marginLeft: "5em",
					marginRight: "5em",
					boxShadow: "1px 3px 3px #888888",
				}}
				className={myClassDarkMode}
			>
				<div className={`table-wrapper ${myClassDarkMode}`}>
					<Card.Header
						className={"card-header "}
						as="h4"
						style={{
							textAlign: "center",
						}}
					>
						STUDENTS LIST
					</Card.Header>

					<div>
						<Table
							className={myClassDarkMode}
							size="sm"
							bordered
							hover
							responsive="sm"
						>
							<thead>
								<tr style={{ color: "#DC143C" }}>
									<th className="text-center" onClick={sortByName}>
										Name
									</th>
									<th>Class</th>
									{uniqueSkills.map((skill) => (
										<th key={skill} className="d-none d-sm-table-cell">
											{skill}
										</th>
									))}
									<th className="text-center" onClick={sortByTotalScore}>
										Total score {isAscending ? "▲" : "▼"}
									</th>
									<th>Profile</th>
								</tr>
							</thead>
							<tbody>
								{sortedStudentNames.map(
									(
										{ student_id, name, class_code, skills, total_score },
										i
									) => (
										<tr key={i}>
											<td className="text-center col-2">{name}</td>
											<td>{class_code}</td>
											{uniqueSkills.map((skill) => (
												<td
													key={skill}
													className="text-center col-6 col-sm-4 d-none d-sm-table-cell"
												>
													{skills[skill] || "0"}
												</td>
											))}

											<td
												key={i}
												className="text-center d-none d-sm-table-cell"
											>
												{total_score}
											</td>
											<td
												className="hidden-sm"
												style={{ margin: "auto", textAlign: "center" }}
											>
												<Button
													variant="link"
													onClick={() => handleUser(student_id)}
													style={{ color: "red" }}
												>
													View More
												</Button>
											</td>
										</tr>
									)
								)}
							</tbody>
						</Table>
					</div>
				</div>
			</Card>
		</Container>
	);
}
export default Mentor;
