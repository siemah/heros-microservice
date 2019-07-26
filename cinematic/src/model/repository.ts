import { Movie } from '../types/model';
// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.
const repository = (db: any) => {
  // movie collection connexion to DB
  const collection: any = db.collection('movies');
  // get all movies 
  const getAllMovies: any = () => new Promise((resolve, reject) => {
    let movies: Array<Movie>;
    const currentDay: Date = new Date();
    const query = {
      releaseYear: {
        $lte: currentDay.getFullYear()
      }
    }
    const cursor = collection.find(query)
    const addMovie = (movie: Movie) => {
      movies.push(movie);
    }
    const sendMovies = (err: any) => {
      if (err) {
        reject(new Error('An error occured fetching all movies, err:' + err))
      }
      resolve(movies)
    }
    cursor.forEach(addMovie, sendMovies)
  })
  // retrieve a list of premiere movies
  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      let movies: Array<Movie>;
      const currentDay: Date = new Date();
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      const cursor = collection.find(query)
      const addMovie = (movie: Movie) => {
        movies.push(movie);
      }
      const sendMovies = (err: any) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(movies)
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }
  // retrieve a movie by id
  const getMovieById = (id: string) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendMovie = (err: any, movie: {} | boolean) => {
        if (err) {
          reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        resolve(movie)
      }
      // fetch a movie by id -- mongodb syntax
      collection.findOne({ id: id }, projection, sendMovie)
    })
  }
  // close a connection to DB
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect
  })

}