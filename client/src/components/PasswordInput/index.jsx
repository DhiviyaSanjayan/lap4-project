import { useRef } from "react";

import { ReactComponent as ShowPassword } from "../../assets/show_password.svg";
import style from "./style.module.css";

export default function PasswordInput() {
  const inputRef = useRef(null);

  return (
    <div className={style["password-container"]}>
      <input
        type="password"
        name="password"
        placeholder="Password"
        ref={inputRef}
        size={1}
        autoComplete="off"
        required
      />
      <a
        className={style["password-toggler"]}
        onClick={() => {
          const input = inputRef.current;
          input.type = input.type == "text" ? "password" : "text";
        }}
      >
        <ShowPassword />
      </a>
    </div>
  );
}
