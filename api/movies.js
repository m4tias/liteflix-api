const instance = require("./instance");

const getPopularMovie = () =>
  instance.req({
    url: "/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20",
    method: "GET",
  });

const getNowPlaying = () =>
  instance.req({
    url: "/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20",
    method: "GET",
  });

module.exports = {
  getPopularMovie,
  getNowPlaying,
};
