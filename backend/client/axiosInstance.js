import axios from "axios";

const instance = axios.create({
  baseURL: "https://open-api.bser.io/v1/",
  timeout: 10000,
  headers: { "x-api-key": "Dm3wLY6iDP7RJrWrYpW0p70lMCMBUgWB5dgyWzZE" },
});

export { instance };
