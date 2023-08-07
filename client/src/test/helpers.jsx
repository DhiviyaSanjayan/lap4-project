import axios from "axios";

export const getAuthenticated = async () => {
  try {
    const creds = {
      username: "t",
      password: "1",
    };

    await axios.post(`${import.meta.env.VITE_SERVER}/users/register`, creds);
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/login`,
      creds
    );
    localStorage.setItem("token", data.token);
    setUser(data.user);
  } catch (error) {
    console.log(error);
  }
};

export const removeAccount = async () => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  await axios.delete(`${import.meta.env.VITE_SERVER}/users`, config);
  localStorage.removeItem("token");
};
