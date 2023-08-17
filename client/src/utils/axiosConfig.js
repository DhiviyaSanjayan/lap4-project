export default function axiosConfig() {
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
};
