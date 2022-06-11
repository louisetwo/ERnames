import axios from "axios";

const instance = axios.create({
  baseURL: "https://open-api.bser.io/v1/",
  timeout: 10000,
  headers: { "x-api-key": process.env.ER_API_KEY },
});

export { instance };
