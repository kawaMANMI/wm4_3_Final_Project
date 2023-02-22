// import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./UsersProfile.css";
import UserProfilePix from "./UserProfilePix";


function UserProfile() {
	const navigate = useNavigate();
	function handleChecklist(){
		navigate("/student");
	}
    const [userData, setUserData] = useState([]);
	// const url = "http://localhost:3100/api/profile/";
    useEffect(() => {
			axios
				.get("/api/user-profile")
				.then((response) => {
					if(response.status === 200){
						return response.data;
					} else {
						throw new Error("Something is wrong");
					}
				})
				.then((data) => {
					setUserData(data[0]);
					console.log(userData);
					console.log("I am here");
				})
				.catch((e) => console.log({ error: e.message }));
		}, []);
	return (
		<div className="profile">
			<div id="pix-profile">
				<UserProfilePix id={`${userData["name"]}${userData["class_code"]}`} />
				<h3>{userData["name"]}</h3>
				<p>{userData["username"]}</p>
				<p>Current Score:</p>
				<p>Previous Score:</p>
				<Button className="btn btn-light" onClick={handleChecklist}>
					My Skill Checklist
				</Button>
				{/* <Button type="button" onClick={handleChecklist}>My Checklist</input> */}
			</div>
			<div id="profile-info">
				<h2>User Profile</h2>
				<p>
					<b>Name: </b>
					{userData["name"]}
				</p>
				<p>
					<b>Username: </b>
					{userData["username"]}
				</p>
				<p>
					<b>Class: </b>
					{userData["class_code"]}
				</p>
				<p>
					<b>Region: </b>
					{userData["region"]}
				</p>
			</div>
		</div>
	);
}

export default UserProfile;
