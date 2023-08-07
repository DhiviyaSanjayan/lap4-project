import style from "./style.module.css";

export default function UsernameInput() {
  return (
    <input
      className={style["input"]}
      type="text"
      name="username"
      placeholder="Username"
      autoComplete="off"
      size={1}
      required
    />
  );
}
