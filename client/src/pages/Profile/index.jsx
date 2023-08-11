import React, { useState, useEffect } from 'react';
import fetchAllUserInfo from "./useFetchData";
import { LogoutButton, DeleteAccount } from "../../components";

import style from "./style.module.css";

export default function Profile() {
  const [user, setUser] = useState({
    username: '',
    exp: 0,
    coins: 0
  });

  useEffect(() => {
    async function fetchDetails() {
      const userToken = localStorage.getItem('token'); 
      const response = await fetch("http://localhost:3000/users/details", {
        headers: {
          'Authorization': userToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user details:', response.statusText);
      }
    }

    fetchDetails();
  }, []);

  return (
    <>
      <div className={style["outer-container"]}>
        <main id="profile" className={style["container"]}>
          <h1>{user.username}'s Profile</h1>
          <p>Experience: {user.exp}</p>
          <p>Coins: {user.coins}</p>
          <LogoutButton />
        </main>
      </div>
    </>
  );
}

