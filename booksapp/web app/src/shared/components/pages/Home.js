import React from 'react';
import SEO from '../widgets/SEO';
import useStyles from 'isomorphic-style-loader/useStyles'
import style from '../assets/css/home.css';
import useRemoveCssStyle from '../hooks/style';
import img from '../assets/images/veggie-beef-min.jpg';

const Home = () => {
  useStyles(style);
  useRemoveCssStyle(style);
  const metas = [
    {
      name: 'description',
      content: 'Find any kind books at booksapp'
    },
    {
      'og:title': 'Find any kind of books',
      content: 'Find any kind books at booksapp'
    }
  ];
  return (
    <div>
      <SEO title='Find any kind of books - Booksapp' metas={metas} />
      <h1 className='title'>Home Page</h1>
      <img src={img}  />
    </div>
  )
}

export default Home;