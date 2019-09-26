import React from 'react';
import SEO from '../widgets/SEO';

const Books = ({ staticContext}) => {
 
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
        
      </ul>
    </div>
  )
}

export default Books
