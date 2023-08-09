import axios from "axios";

/**
 * Make trefle api calls on the client side using the api as an intermediary
 * 
 * @param {string} path - everything in an api call after '/api/v1' and with out a token as a query parameter
 * @returns json object returned by trefle
 */
export default async function trefleFetch(path) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/trefle-api/${path}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
