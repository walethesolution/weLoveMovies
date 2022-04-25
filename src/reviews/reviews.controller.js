const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const reviewData = await reviewsService.read(reviewId)
  if (reviewData) {
    res.locals.review = reviewData;
    return next();
  }
  next({
    status: 404,
    message: `${reviewId} cannot be found`
  })
}

async function destroy(req, res) {
  await reviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await reviewsService.update(updatedReview);
  const returnData = await reviewsService.updatedReviewWithCritics(res.locals.review.review_id);
  res.json({ data: returnData });
}

module.exports = {
  delete: [reviewExists, asyncErrorBoundary(destroy)],
  update: [reviewExists, asyncErrorBoundary(update)],
};
