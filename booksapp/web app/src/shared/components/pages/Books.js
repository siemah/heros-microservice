import React, { useState, } from 'react';
import { NavLink, } from 'react-router-dom';
import { getDataFromWindowOrContext } from '../../utils/data';
import SEO from '../widgets/SEO';

const Books = ({ staticContext}) => {
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
  
  return (
    <div>
      <SEO title='Find any kind of books - Booksapp' metas={metas} />
      <h1>Books list </h1>
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
