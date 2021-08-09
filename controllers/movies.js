const fs = require('fs').promises;
const path = require('path');
const { getPopularMovie, getNowPlaying } = require('../api');

const filePath = path.resolve(__dirname, '../db/movies.json');

const getPopularMovies = async (req, res) => {
  const clean = (
    { title, backdrop_path, vote_average, release_date },
    img
  ) => ({
    title,
    img: `https://image.tmdb.org/t/p/${
      img === 'original' ? img : 'w500'
    }${backdrop_path}`,
    score: vote_average,
    year: release_date.slice(0, 4),
  });

  let nowPlaying;
  try {
    nowPlaying = await getNowPlaying();
    nowPlaying = nowPlaying.results;
    nowPlaying = clean(nowPlaying[0], 'original');
  } catch (e) {
    nowPlaying = {};
  }

  let populars;
  try {
    const { results } = await getPopularMovie();
    populars = results.slice(0, 4);
    populars = populars.map(clean);
    populars = populars.filter((popular) => popular.title !== nowPlaying.title);
    if (populars.length === 3) populars = [...populars, clean(results[4])];
  } catch (e) {
    populars = [];
  }

  res.status(200).json({ nowPlaying, populars });
};

const getMyMovies = async (req, res) => {
  const file = await fs.readFile(filePath, 'utf-8');
  let myMovies = JSON.parse(file);
  myMovies = myMovies.slice(-4);
  res.status(200).json(myMovies);
};

const postMovie = async (req, res) => {
  const file = await fs.readFile(filePath, 'utf-8');
  let myMovies = JSON.parse(file);
  myMovies = [...myMovies, req.body];
  await fs.writeFile(filePath, JSON.stringify(myMovies));
  res.status(200).json({ myMovies });
};

const postImg = async (req, res) => {
  await fs.rename(
    path.resolve(__dirname, `../images/${req.file.filename}`),
    path.resolve(__dirname, `../images/${req.file.filename}.jpeg`)
  );
  res.status(200).json({ img: `/static/images/${req.file.filename}.jpeg` });
};

module.exports = {
  getPopularMovies,
  getMyMovies,
  postMovie,
  postImg,
};
