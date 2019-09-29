import React, { useState, useEffect, useContext, } from 'react';
import { useParams, useLocation, } from 'react-router-dom'
import { getDataFromWindowOrContext } from '../../utils/data';
import SEO from '../widgets/SEO';
import endpoints from '../../config/endpoints';
import AuthContext from '../context/auth';

const Book = ({ staticContext, fetchInitialData, postOrder }) => {
  let { id } = useParams();
  let { data } = useLocation();
  const _authContext = useContext(AuthContext);
  let book = getDataFromWindowOrContext(null, staticContext);
  const [bookDetails, setBookDetails] = useState({
    data: book,
    loading: false,
    message: null,
  });

  const _onOrder = () => {
    console.log(_authContext.user.token)
    postOrder({
      book: bookDetails.data._id,
      isCanceled: false,
    }, _authContext.user.token);
  }

  useEffect(() => {
    const _getData = async () => {
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
    <article itemScope itemType='https://schema.org/Book' className={`book book-${'bookDetails.book._id'}`}>
      <SEO title={`${bookDetails.data.title || data.title}`} />
      {bookDetails.loading && <h4>Loading ..</h4>}
      {bookDetails.message && <h4><mark>{bookDetails.message}</mark></h4>}
      <h1 itemProp='name'>{bookDetails.data.title || data.title}</h1>
      <h2>
        ISBN: 
        {
          bookDetails.data.title
            ? (<span itemProp='isbn'>{` ` + bookDetails.data.isbn}</span>)
            : ' Loading ..'
        }
      </h2>
      <p itemProp='description'>{bookDetails.data.description || data.description}</p>
      <button onClick={_onOrder} >Order Book</button>
    </article>
  )
}

export default Book
