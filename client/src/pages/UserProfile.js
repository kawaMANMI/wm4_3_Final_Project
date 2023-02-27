// import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./UsersProfile.css";
import UserProfilePix from "./UserProfilePix";

function UserProfile() {
  const navigate = useNavigate();
  function handleChecklist() {
    navigate("/student");
  }
  const [userData, setUserData] = useState([]);
  // const url = "http://localhost:3100/api/profile/";
  useEffect(() => {
    axios
      .get("/api/user-profile")
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Something is wrong");
        }
      })
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((e) => console.log({ error: e.message }));
  }, []);
  return (
    <div className="profile">
      <div id="pix-profile">
        <UserProfilePix id={`${userData["name"]}${userData["class_code"]}`} />
        <h3>{userData["name"]}</h3>
        <p style={{ color: "grey" }}>{userData["username"]}</p>
        <p>Current Score:</p>
        <p>Previous Score:</p>
        <Button className="btn btn-light" onClick={handleChecklist}>
          My Skill Checklist
        </Button>
        <br></br>
        <br></br>
        <Button className="btn btn-light">Edit Profile</Button>
        <h4 className="chart">Progress Chart</h4>
      </div>
      <div id="profile-info">
        <h2>User Profile</h2>
        <p>
          <span>
            <b>Name: </b>
          </span>
          {userData["name"]}
        </p>
        <p>
          <span>
            <b>Username: </b>
          </span>
          {userData["username"]}
        </p>
        <p>
          <span>
            <b>Class: </b>
          </span>
          {userData["class_code"]}
        </p>
        <p>
          <span>
            <b>Region: </b>
          </span>
          {userData["region"]}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
