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
      if( books.message) throw new Error(books.message);
      if(!!book) return books 
      return books.books
    })
    .catch((error) => {
      throw new Error(error.message)
    });
}

export const postOrder = async (order, token) => {
  console.log('order', order)
  try {
    let res = await fetch(
      endpoints.order, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify(order),
      });
    let data = await res.json();
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}