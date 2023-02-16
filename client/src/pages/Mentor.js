import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Mentor() {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/students")
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => setStudentData(data))
      .catch((error) => {
        console.log({ error: error.message });
      });
  }, []);

  return (
    <div className="table_container">
      <h2 style={{ textAlign: "center" }}>STUDENTS LIST</h2>
      <Table bordered hover size="sm" responsive="md" striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>SCORES</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map(({ id, name, score }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Mentor;
