import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Mentor.css";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";

function Mentor() {
  const navigate = useNavigate();
  function handleSkill() {
    navigate("/skills");
  }
  function handleUser() {
    navigate("/user-profile");
  }
  const [scores, setScores] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    axios
      .get(`api/skills-by-region?region=${selectedRegion}`)
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
  }, [selectedRegion]);
  console.log(scores);

  const uniqueSkills = scores
    .map((score) => score.skill_name)
    .filter((value, index, array) => array.indexOf(value) === index);
  //create an object to store the scores for each student
  const studentScores = {};
  scores.forEach(({ student_id, student_name, skill_name, total_score }) => {
    //if the student has already been added to the object,update their scores,
    if (student_id in studentScores) {
      studentScores[student_id].totalScore += total_score;
      studentScores[student_id].skills[skill_name] = total_score;
    } else {
      //if the student hasn't been added to the object,add them to the object with their initial score
      studentScores[student_id] = {
        name: student_name,
        totalScore: total_score,
        skills: { [skill_name]: total_score },
      };
    }
  });
  return (
    <Container fluid responsive="sm" className="table_container">
      <div className="button_container">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              REGIONS
            </Dropdown.Toggle>

            <Dropdown.Menu>
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
        <Button
          variant="primary"
          className="button_enabled"
          onClick={handleSkill}
        >
          Learning Objectives
        </Button>
      </div>
      <div className="table-wrapper">
        <h2>STUDENTS LIST</h2>
        <Table size="sm" hover responsive="sm">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              {uniqueSkills.map((skill) => (
                <th key={skill}>{skill}</th>
              ))}
              <th>Student Profile</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(studentScores).map(({ name, skills }, i) => (
              <tr key={i}>
                <td className="text-center">{name}</td>
                {uniqueSkills.map((skill) => (
                  <td key={skill}>{skills[skill] || "0"}</td>
                ))}
                <td style={{ margin: "auto", textAlign: "center" }}>
                  <button onClick={handleUser}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
export default Mentor;
