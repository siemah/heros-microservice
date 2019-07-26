// movie structure
export interface Movie {
  id: string;
  title: string;
  format: any;
  releaseYear: number,
  releaseMonth: number;
  releaseDay: number;
}
// repository 
export interface Repo {
  getAllMovies(): any;
  getMoviePremiers(): any;
  getMovieById(id: string): any;
}