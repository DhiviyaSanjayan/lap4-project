import { useEffect, useState } from "react";
import axios from "axios";

import { writePopup } from "../../components";

export default function fetchAllUserInfo() {
  const [userData1, setUserData1] = useState();
  const [userData2, setUserData2] = useState();
  const [userData3, setUserData3] = useState();

  useEffect(() => {
    const getUserDetails = async () => {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data: data1 } = await axios.get(
          `${import.meta.env.VITE_SERVER}/something1`,
          config
        );
        const { data: data2 } = await axios.get(
          `${import.meta.env.VITE_SERVER}/something2`,
          config
        );

        setUserData1(data1);
        setUserData2(data2);
      } catch (error) {
        console.log(error);
        writePopup(error);
      }
      const { data: data3 } = await axios.get(
        `${import.meta.env.VITE_SERVER}/something3`,
        config
      );
      setUserData3(data3);
    };
    getUserDetails();
  }, []);


  
  return {};
}
