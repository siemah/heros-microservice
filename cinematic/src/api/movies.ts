import { Application } from "express";
import { ServerOptions as Options } from "../types/config";
import { Movie, Repo } from "../types/model";

export default (app: Application, options: Options) => {
  let repo: Repo = options.repo;
  // here we get all the movies 
  app.get('/movies', (req, res, next) => {
    repo.getAllMovies().then((movies: Array<Movie>) => {
      res.status(200).json(movies)
    }).catch(next)
  })

  // here we retrieve only the premieres
  app.get('/movies/premieres', (req, res, next) => {
    repo.getMoviePremiers().then((movies: Array<Movie>) => {
      res.status(200).json(movies)
    }).catch(next)
  })

  // here we get a movie by id
  app.get('/movies/:id', (req, res, next) => {
    repo.getMovieById(req.params.id).then((movie: Movie) => {
      res.status(200).json(movie)
    }).catch(next)
  })
}