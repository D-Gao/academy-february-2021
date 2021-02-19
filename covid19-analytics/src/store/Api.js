import axios from "axios";

export default axios.create({
  baseURL: "https://techedge-academy-feb-2021.azurewebsites.net/",
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  },
});
