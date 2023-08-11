import axios from "axios";

export default async function fetchAllUserInfo() {
  let dataArr = [];

  const urls = [
    `${import.meta.env.VITE_SERVER}/users/details`,
    `${import.meta.env.VITE_SERVER}/plants`,
    `${import.meta.env.VITE_SERVER}/animals`,
    `${import.meta.env.VITE_SERVER}/displays`,
  ];

  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const datas = await Promise.all(urls.map((url) => axios.get(url, config)));

    datas.forEach(({ data }) => {
      dataArr.push(data);
    });
  } catch (error) {
    console.log(error);
  }

  const gameInfo = {
    user: dataArr[0],
    plants: dataArr[1],
    animals: dataArr[2],
    display: dataArr[3],
  };

  return gameInfo;
}
