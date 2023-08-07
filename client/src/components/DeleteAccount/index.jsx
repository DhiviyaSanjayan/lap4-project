import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts";
import { writePopup } from "../Popup";

import style from "./style.module.css";

export default function DeleteAccount() {
  const goTo = useNavigate();
  const { setUser } = useAuth();

  const deleteAccount = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    if (!confirm("You're about to delete your account")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/users`, config);
      localStorage.removeItem("token");
      setUser(null);
      goTo("/");
    } catch (error) {
      writePopup(error);
      console.log(error);
    }
  };

  return (
    <button className={style["button"]} data-testid="delete" onClick={deleteAccount}>
      Delete Account
    </button>
  );
}
