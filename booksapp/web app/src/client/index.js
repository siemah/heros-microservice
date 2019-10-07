import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

hydrate(
  <Router>
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  </Router>,
  document.getElementById('app')
);