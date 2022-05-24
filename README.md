# We Love Movies
This project build complex servers and access data through a database.

## Live deployment
**View live app of** [weLoveMovies](https://tranquil-fjord-38398.herokuapp.com/)


## API endpoints 
| Method | Routes | Description |
| --- | --- | --- |
| `GET` | `\movies` | List all the movies |
| `GET` | `movies?is_showing=true` | returns those movies where the movie is currently showing in theaters |
| `GET` | `\movies\:movieId` | This route will return a single movie by ID |
| `GET` | `\movies\:movieId\reviews` | This route should return all the reviews for the movie, including all the critic details added to a critic key of the review|
| `GET` | `\movies\:movieId\theaters` | This route should return all the theaters where the movie is playing |
| `GET` | `theaters` | Shows a list of theaters |
| `DELETE` | `/reviews/:reviewId` | This route will delete a review by ID. If the ID is incorrect, a 404 will be returned |
| `PUT` | `/reviews/:reviewId` | This route will allow you to partially or fully update a review. If the ID is incorrect, a 404 will be returned |
