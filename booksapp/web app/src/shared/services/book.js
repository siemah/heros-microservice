import endpoints from "../config/endpoints";

/**
 * retrieve a list of all books
 * @param {string} book mayeb slug or book id
 * @param {object} opts list of options of fetch
 * @return Promise<object|null> contain list of books
 */
export const fetchBooks = (book, opts={}) => {
  const endpoint = book !== 'books'
    ? `${endpoints.book}/${book}` 
    : `${endpoints.booksList}`;
  const encodedURI = encodeURI(endpoint)

  return fetch(encodedURI, opts)
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