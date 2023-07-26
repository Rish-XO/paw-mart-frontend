import React from "react";
import { useParams } from "react-router";

function Profile() {
  const { userID } = useParams();
  return (
    <div>
      <h1>
        helloo
        {userID}
      </h1>
    </div>
  );
}

export default Profile;
