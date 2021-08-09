const axios = require("axios");

const axiosConfig = {
  baseURL: "https://api.themoviedb.org/3/movie",
  headers: {
    "Content-Type": "application/json",
  },
};

const themoviedbInstance = axios.create(axiosConfig);

const instance = {
  req(options) {
    return themoviedbInstance(options).then((res) => res.data);
  },
};

module.exports = instance;
