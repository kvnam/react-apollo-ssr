import React from 'react';

const Html = ({ content }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Round One SSR App</title>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
    </body>
  </html>
);

export default Html;