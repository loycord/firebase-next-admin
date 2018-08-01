const express = require('express');
const bodyParser = require('body-parser');

const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

const apiV1 = require('./routes/apiV1.js');

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use('/api/v1', apiV1);

  // Server-side
  server.get('/preact', (req, res) => {
    return app.render(req, res, '/preact');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
