export default function axiosConfig() {
  console.log(localStorage.getItem("token"))
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
};
