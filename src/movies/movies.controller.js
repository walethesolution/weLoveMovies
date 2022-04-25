const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.readId(movieId);
  if (movie) {
    res.locals.movie = movie
    return next()
  }
  next({
    status: 404,
    message: "Movie cannot be found."
  })
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = await moviesService.list(is_showing);
  res.json({ data });
}

async function read(req, res) {
  const data = await moviesService.readId(res.locals.movie.movie_id);
  res.json({ data });
}

async function moviesPlaying(req, res) {
  const data = await moviesService.moviesPlaying(res.locals.movie.movie_id);
  res.json({ data });
}

async function readReviews(req, res) {
  const data = await moviesService.readReviews(res.locals.movie.movie_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  moviesPlaying: [asyncErrorBoundary(movieExists), asyncErrorBoundary(moviesPlaying)],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
};
