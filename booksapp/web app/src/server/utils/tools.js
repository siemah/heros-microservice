import serialize from 'serialize-javascript';

/**
 * render a html page based on jsx
 * @param {string} markup html tag retrieved fron jsx
 * @param {object} data contain details about app
 */
export const jsxToHtml = (markup, helmet, data={}) => (`
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <!-- meta and title tags -->
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body>
      <div id="app">${markup}</div>
      <script src="/bundle.js" defer></script>
      <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
    </body>
  </html>
`);