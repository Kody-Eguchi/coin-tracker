import React from "react";

function UserProfile(props) {
  const { username, email } = props.user;
  return (
    <div>
      <h1>User Profile!!!</h1>
      <p>{username}</p>
      <p>{email}</p>
    </div>
  );
}

export default UserProfile;
