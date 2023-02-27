import React from "react";
import "./UsersProfile.css";

function UserProfilePix(id) {
  const picLink = `https://robohash.org/${id}.png`;
  return (
    <div>
      <img
        className="p-pic"
        style={{ borderRadius: "50%", borderColor: "#0000FF" }}
        src={picLink}
        alt="profile pix"
      ></img>
    </div>
  );
}
export default UserProfilePix;
