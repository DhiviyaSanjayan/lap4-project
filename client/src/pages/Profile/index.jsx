import fetchAllUserInfo from "./useFetchData";
import { LogoutButton, DeleteAccount } from "../../components";

import style from "./style.module.css";

export default function Profile() {
  return (
    <>
      <div className={style["outer-container"]}>
        <main id="profile" className={style["container"]}>
          Profile Page
          <LogoutButton />
        </main>
      </div>
    </>
  );
}
