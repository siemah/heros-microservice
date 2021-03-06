import serialize from 'serialize-javascript';
import React from 'react';
import { renderToString, } from 'react-dom/server';
import { StaticRouter, } from 'react-router-dom';
import Helmet from 'react-helmet';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from '../../shared/components/App';

/**
 * render a html page based on jsx
 * @param {string} location the current link hit by user
 * @param {object} context data 2 send for user needed by app
 * @param {object} data contain details about app most of time like context
 * @return string which is html tags or 
 *  object with redirecTo prop in case detecte redirection like private routes 
 */
export const jsxToHtml = (location, data) => {
  let context = data;
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style =>  css.add(style._getCss()))
  let _markup = renderToString(
    <StaticRouter location={location} context={context}>
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>
    </StaticRouter>
  );
  if(context.url) return {
    redirectTo: context.url,
  }
  let _helmet = Helmet.renderStatic();
  return (`
    <!DOCTYPE html>
    <html ${_helmet.htmlAttributes.toString()}>
      <head>
        <!-- meta and title tags -->
        ${_helmet.title.toString()}
        ${_helmet.meta.toString()}
        ${_helmet.link.toString()}
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="app">${_markup}</div>
        <script src="/main.js" defer></script>
        <script>window.__USER_DATA__ = ${serialize(data.user)}</script>
        <script>window.__INITIAL_DATA__ = ${serialize(data.data)}</script>
      </body>
    </html>
  `);
}