/**
 * render a html page based on jsx
 * @param {string} markup html tag retrieved fron jsx
 * @param {object} data contain details about app
 */
export const jsxToHtml = (markup, data) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <!-- meta and title tags -->
      <script src="/bundle.js" defer></script>
      <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
    </head>
    <body>
      <div id="app">${markup}</div>
    </body>
  </html>
`);