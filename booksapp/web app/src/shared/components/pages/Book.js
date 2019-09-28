import React, { useState, useEffect, useContext, } from 'react';
import { getDataFromWindowOrContext } from '../../utils/data';
import SEO from '../widgets/SEO';
import endpoints from '../../config/endpoints';
import AuthContext from '../context/auth';

const Book = ({ staticContext, fetchInitialData, match }) => {
  const _authContext = useContext(AuthContext);
  let book = getDataFromWindowOrContext(null, staticContext);
  const [bookDetails, setBookDetails] = useState({
    data: book,
    loading: false,
    message: null,
  });

  useEffect(() => {
    console.log('fetching..')
    const _getData = async () => {
      let { id } = match.params;
      let headers = {
        Authorization: `JWT ${_authContext.user.token}`,
      };
      setBookDetails({ ...bookDetails, loading: true, });
      try {
        let _res = await fetchInitialData(`${endpoints.book}/${id}`, { headers, });
        setBookDetails({ ...bookDetails, data: _res, loading: false, });
      } catch ({ message }) {
        setBookDetails(prevS => ({ ...prevS, loading: false, message, }));
      }
    }
    !bookDetails.data.title && _getData();
    return () => {

    };
  }, [])

  return (
    <div itemScope itemType='https://schema.org/Book' className={`book book-${'bookDetails.book._id'}`}>
      <SEO title={`Book page`} />
      {bookDetails.loading && <h4>Loading ..</h4>}
      {bookDetails.message && <h4><mark>{bookDetails.message}</mark></h4>}
      {
        bookDetails.data.title && (
          <article>
            <h1 itemProp='name'>{bookDetails.data.title}</h1>
            <h4 itemProp='isbn'>{bookDetails.data.isbn}</h4>
            <p itemProp='description'>{bookDetails.data.description}</p>
          </article>
        )
      }
    </div>
  )
}

export default Book
