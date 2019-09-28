import React, { useState,  } from 'react';
import { getDataFromWindowOrContext } from '../../utils/data';
import SEO from '../widgets/SEO';

const Book = ({ staticContext, fetchInitialData, match}) => {
  let book = getDataFromWindowOrContext(null, staticContext);
  const [bookDetails, setBookDetails] = useState({
    book,
    loading: book ? false : true,
  });

  return (
    <div itemScope itemType='https://schema.org/Book' className={`book book-${bookDetails.book._id}`}>
      <SEO title={`Book page`} />
      <h1 itemProp='name'>{bookDetails.book.title}</h1>
      <h4 itemProp='isbn'>{bookDetails.book.isbn}</h4>
      <p itemProp='description'>{bookDetails.book.description}</p>
    </div>
  )
}

export default Book
