const express = require('express');
const bodyParser = require('body-parser');

const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

const apiV1 = require('./routes/apiV1.js');
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use('/api/v1', apiV1);
  server.use('/api/v1/users', users);
  server.use('/api/v1/posts', posts);

  // Server-side
  server.get('/admin/auth', (req, res) => {
    return app.render(req, res, '/admin/auth');
  })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
