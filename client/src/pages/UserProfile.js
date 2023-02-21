// import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";


function UserProfile() {
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
			<div id="pix-profile"></div>
			<div id="profile-info">
				<h2>User Profile</h2>
				<p>
					<b>Name: </b>
					{userData["name"]}
				</p>
				<p>
					<b>Username: </b>Adeyemo
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
