import React from 'react';
import SEO from '../widgets/SEO';

const Home = () => {
  const metas = [
    {
      name: 'description',
      content: 'Find any kind books at booksapp'
    },
    {
      'og:title': 'Find any kind of books',
      content: 'Find any kind books at booksapp'
    }
  ]
  return (
    <div>
      <SEO title='Find any kind of books - Booksapp' metas={metas} />
      <h1>Home Page</h1>
    </div>
  )
}

export default Home;
