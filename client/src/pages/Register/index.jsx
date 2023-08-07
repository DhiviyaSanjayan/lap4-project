import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { writePopup } from "../../components";
import { UsernameInput, PasswordInput } from "../../components";

import style from "./style.module.css";

export default function Register() {
  const goTo = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const userDetails = new FormData(e.target);

    try {
      const config = {
        username: userDetails.get("username"),
        password: userDetails.get("password"),
      };

      const { status } = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/register`,
        config
      );

      if (status == 201) {
        await writePopup("Your account has been registered!");
        goTo("/login");
      }
    } catch (error) {
      writePopup(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <>
      <div className={style["container"]}>
        <h1>Register</h1>
        <form id="register-form" onSubmit={registerUser}>
          <UsernameInput />
          <PasswordInput />
          <button type="submit">Register Account</button>
        </form>
        <p>
          Already registered? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </>
  );
}
