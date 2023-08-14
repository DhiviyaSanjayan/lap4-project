import style from "./style.module.css";
import { ReactComponent as User } from "../../assets/user_icon.svg";

export default function UsernameInput() {
  return (
    <div className={style["container"]}>
      <User />
      <input
        className={style["input"]}
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="off"
        size={1}
        required
      />
    </div>
  );
}
