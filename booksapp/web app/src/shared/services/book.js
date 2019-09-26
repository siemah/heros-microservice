import endpoints from "../config/endpoints";

/**
 * retrieve a list of all books
 * @param {string} book mayeb slug or book id
 */
export const fetchBooks = (book) => {
  const endpoint = book !== 'books'
    ? `${endpoints.book}/${book}` 
    : `${endpoints.booksList}`;
  const encodedURI = encodeURI(endpoint)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((books) => {
      if(!!book) return books 
      return books.books
    })
    .catch((error) => {
      console.warn(error)
      return null
    });
}