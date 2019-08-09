import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import Html from './html';
import App from '../src/App';

const app = express();

app.use(express.static(path.resolve(__dirname, './build'), { index: false }));

app.get('*', (req, res) => {
    console.log('In path /');
    const application = <App />;
    const content = ReactDOMServer.renderToString(application);
    console.log(content);
    const html = <Html content={content} />;
    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
});

export default app;