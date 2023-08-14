import React, { useState, useEffect } from "react";
import fetchAllUserInfo from "../../utils/fetchAllUserInfo";
import { ReactComponent as Flower } from "../../assets/images/profile_flower.svg";
import { LogoutButton, DeleteAccount } from "../../components";

import style from "./style.module.css";

export default function Profile() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      setUserInfo(await fetchAllUserInfo());
    })();
  }, []);

  return (
    <>
      <div className={style["outer-container"]}>
        <Flower />
        {userInfo && (
          <main id="profile" className={style["container"]}>
            <div className={style["tags"]}>
              <span>
                plant
                <br />
                count
              </span>
              <span>coins</span>
              <span>experience</span>
            </div>
            <div id="account-info" className={style["account-info"]}>
              <p>{userInfo.user.username}'s Account</p>
              <p>
                User Since:{" "}
                {new Date(userInfo.user.creation_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p id="flower-count" className={style["flower-count"]}>
                {userInfo.plants.length}
              </p>
            </div>

            <div>
              <p id="coins" className={style["coins"]}>
                {userInfo.user.coins}
              </p>
            </div>
            <div>
              <p id="user-exp" className={style["user-exp"]}>
                <span>{userInfo.user.exp}</span>
              </p>
            </div>
            <LogoutButton />
            <DeleteAccount />
          </main>
        )}
      </div>
    </>
  );
}
