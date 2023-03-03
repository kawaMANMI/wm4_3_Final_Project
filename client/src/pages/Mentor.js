import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Mentor.css";
import "./Home.css";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import RegionDropdown from "./RegionDropdown";
import ClassCodeDropdown from "./ClassCodeDropdown";

function Mentor({ colorForIsDarkMode }) {
	const navigate = useNavigate();
	function handleSkill() {
		navigate("/skills");
	}
	function handleUser(student_id) {
		navigate(`/user-profile/${student_id}`, {
			state: { studentId: student_id },
		});
	}
	const [scores, setScores] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState("");
	const [isAscending, setIsAscending] = useState(true);
	const [selectedClassCode, setSelectedClassCode] = useState("");

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
	//create an object to store the scores for each student
	const studentScores = {};
	scores.forEach(
		({ student_id, student_name, class_code, skill_name, total_score }) => {
			//if the student has already been added to the object,update their scores,

			if (student_id in studentScores) {
				studentScores[student_id].totalScore =
					Number(studentScores[student_id].totalScore) + Number(total_score);
				studentScores[student_id].skills[skill_name] = total_score;
			} else {
				//if the student hasn't been added to the object,add them to the object with their initial score
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
			className="table_container"
			style={colorForIsDarkMode}
		>
			<div className="button_container" style={colorForIsDarkMode}>
				<div>
					<Dropdown style={colorForIsDarkMode}>
						<Dropdown.Toggle
							variant="primary"
							id="dropdown-basic"
							style={colorForIsDarkMode}
						>
							{!selectedRegion ? "All Regions" : selectedRegion}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => setSelectedRegion("")}>
								All Regions
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setSelectedRegion("London")}>
								London
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setSelectedRegion("North West")}>
								North West
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setSelectedRegion("West Midlands")}>
								West Midlands
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setSelectedRegion("Cape Town")}>
								Cape Town
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
		<Container fluid responsive="sm" className="table_container">
			<div className="button_container">
				<RegionDropdown setSelectedRegion={setSelectedRegion} />
				<ClassCodeDropdown setSelectedClassCode={setSelectedClassCode} />
				<Button
					variant="primary"
					className="button_enabled"
					style={colorForIsDarkMode}
					onClick={handleSkill}
				>
					Learning Objectives
				</Button>
			</div>
			<div className="table-wrapper">
				<h2>STUDENTS LIST</h2>
				<Table size="sm" hover responsive="sm" >
					<thead>
				<h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
					STUDENTS LIST
				</h2>
				<Table size="sm" hover responsive="sm">
					<thead style={{ margin: "1em" }}>
						<tr>
							<th className="text-center" onClick={sortByName}>
								Name
								{/* {isAscending ? "▲" : "▼"} */}
							</th>
							<th>Class Code</th>
							{uniqueSkills.map((skill) => (
								<th key={skill}>{skill}</th>
							))}
							<th> Total score</th>
							<th>Student Profile</th>
						</tr>
					</thead>
					<tbody>
						{Object.values(studentScores).map(({ name, skills }, i) => (
							<tr key={i}>
								<td className="text-center" style={colorForIsDarkMode}>
									{name}
								</td>
								{uniqueSkills.map((skill) => (
									<td key={skill}>{skills[skill] || "0"}</td>
								))}
								<td style={{ margin: "auto", textAlign: "center" }}>
									<button onClick={handleUser}>View</button>
								</td>
							</tr>
						))}
						{sortedStudentNames.map(
							({ student_id, name, class_code, skills, total_score }, i) => (
								<tr key={i}>
									<td className="text-center col-2">{name}</td>
									<td>{class_code}</td>
									{uniqueSkills.map((skill) => (
										<td key={skill} className="text-center col-4">
											{skills[skill] || "0"}
										</td>
									))}

									<td key={i} className="text-center col-4">
										{total_score}
									</td>
									<td style={{ margin: "auto", textAlign: "center" }}>
										<Button
											variant="link"
											onClick={() => handleUser(student_id)}
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
		</Container>
	);
}
export default Mentor;
