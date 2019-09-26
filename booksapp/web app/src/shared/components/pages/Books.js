import React, { useState, useEffect, } from 'react';
import { NavLink, } from 'react-router-dom';
import { getDataFromWindowOrContext } from '../../utils/data';
import SEO from '../widgets/SEO';
import endpoints from '../../config/endpoints';

const Books = ({ staticContext, fetchInitialData }) => {
  // get the books data fetched from server
  let _books = getDataFromWindowOrContext('books', staticContext);
  // update state depend on data fetched from servers
  const [books, setBooks] = useState({
    data: _books,
    loading: false,
  });
  // list of meta tags
  const metas = [
    {
      name: 'description',
      content: 'Find any kind books at booksapp'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    }
  ];
  // load data from client side
  useEffect(() => {
    let _isMount = true;
    _isMount && !books.data.books && setBooks({ ...books, loading: true, });
    !books.data.books && fetchInitialData(endpoints.booksList)
      .then(booksList => {
        _isMount && setBooks({ ...books, data: booksList, loading: false, });
      })
      .catch(e => {
        console.log(e);
        _isMount && setBooks({ ...books, loading: false, message: 'Something went wrong, try after moment' });
      })
    return () => {
      _isMount = false;
    };
  }, []);

  return (
    <div>
      <SEO title='Find any kind of books - Booksapp' metas={metas} />
      <h1>Books list </h1>
      {
        books.loading && <h4>Loading .. {books.loading}</h4>
      }
      <ul>
        {
          books.data.books && books.data.books.map(book => (
            <li key={book._id}>
              <NavLink to={`/book/${book._id}`}>
                <article>
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                </article>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Books
