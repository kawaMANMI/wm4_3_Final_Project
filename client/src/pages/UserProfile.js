// import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";


function UserProfile() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get("/api/user/")
        .then((response) => {
            if(response.status === 200){
                return response.data;
            } else {
                throw new Error("Error in getting data");
            }
        })
        .then((data) => setUserData(data))
        .catch((e) => console.log({ "error": e.message }));
    },[]);
	return (
		<div className="profile">
			<div id="pix-profile">
			</div>
			<div id="profile-info">
				<h2>User Profile</h2>
                <p><b>Name:     </b></p>
                <p><b>Username: </b></p>
                <p><b>Class:    </b></p>
                <p><b>Region:   </b></p>

            </div>
		</div>
	);
}

export default UserProfile;
