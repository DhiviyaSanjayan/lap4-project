import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../contexts";
import { writePopup } from "../Popup";

import style from "./style.module.css";

export default function LogoutButton() {
  const goTo = useNavigate();
  const { setUser } = useAuth();

  const LogOut = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      localStorage.removeItem("token");
      setUser(null);
      await writePopup("You've Logged Out");
      //we don't care whether the token has been deleted on the db or not
      await axios.delete(`${import.meta.env.VITE_SERVER}/users/logout`, config);
      goTo("/");
    } catch (error) {
      writePopup(error);
      console.log(error);
    }
  };

  return (
    <button className={style["button"]} onClick={LogOut}>
      Logout
    </button>
  );
}
