import React from 'react';
import { getDataFromWindowOrContext } from '../../utils/data';
import SEO from '../widgets/SEO';

const Book = ({ staticContext, }) => {
  let _book = getDataFromWindowOrContext(null, staticContext);

  return (
    <div itemScope itemType='https://schema.org/Book' className={`book book-${_book._id}`}>
      <SEO title={`Book page`} />
      <h1 itemProp='name'>{_book.title}</h1>
      <h4 itemProp='isbn'>{_book.isbn}</h4>
      <p itemProp='description'>{_book.description}</p>
    </div>
  )
}

export default Book
