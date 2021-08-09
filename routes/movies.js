const express = require('express');
const multer = require('multer');
const path = require('path');
const { movies } = require('../controllers');

const upload = multer({
  dest: path.resolve(__dirname, '../images'),
});

const router = express.Router();

router.get('/popular', movies.getPopularMovies);

router.get('/my-movies', movies.getMyMovies);

router.post('/movie', movies.postMovie);

router.post('/upload-img', upload.single('img_file'), movies.postImg);

module.exports = router;
