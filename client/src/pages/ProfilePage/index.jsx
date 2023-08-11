import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:3000/users/details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else if (response.status === 401) {
          console.log("User is not logged in or registered.");
        } else {
          console.error("Error fetching user details.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          {user.last_login_time && (
            <p>Last Login Time: {user.last_login_time}</p>
          )}
          {user.last_logout_time && (
            <p>Last Logout Time: {user.last_logout_time}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
