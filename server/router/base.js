const express = require('express');
const router = express.Router();
const firebase = require('../../firebase');

function checkToken(req) {
  const idToken = req.get('Authorization');
  return new Promise(resolve => {
    if (idToken) {
      firebase.auth
        .verifyIdToken(idToken)
        .then(decodedToken => {
          const { uid } = decodedToken;
          resolve(uid);
        })
        .catch(error => {
          console.error(error);
          resolve(false);
        });
    } else {
      resolve(false);
    }
  });
}

function baseRouter(model, apiPrivate) {
  let userId;
  router.all('*', async (req, res, next) => {
    if (apiPrivate) {
      userId = await checkToken(req);
      if (userId) {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      next();
    }
  });

  router
    .route('/')
    .get(async (req, res) => {
      let data;
      if (req.query) {
        const { field, offset, limit } = req.query;
        if ((field && limit) || offset) {
          data = await model.getPage(req.query);
        } else {
          data = await model.getFilter(req.query);
        }
      } else {
        data = await model.getAll();
      }

      if (!data) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data);
      }
    })
    .post(async (req, res) => {
      const docId = await model.add(req.body);

      if (!docId) {
        res.sendStatus(400);
      } else {
        res.status(201).send(docId);
      }
    });

  router.get('/search', async (req, res) => {
    if (req.query) {
      const data = await model.getSearch(req.query);

      if (!data) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data);
      }
    } else {
      res.sendStatus(400);
    }
  });

  router
    .route('/:docId')
    .get(async (req, res) => {
      const data = await model.get(req.params.docId);

      if (!data) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data);
      }
    })
    .put(async (req, res) => {
      const docId = await model.update(req.params.docId, req.body);

      if (!docId) {
        res.sendStatus(404);
      } else {
        res.status(201).send(docId);
      }
    })
    .post(async (req, res) => {
      const docId = await model.create(req.params.docId, req.body);

      if (!docId) {
        res.sendStatus(400);
      } else {
        res.status(201).send(docId);
      }
    })
    .delete(async (req, res) => {
      const docId = await model.delete(req.params.docId);

      if (!docId) {
        res.sendStatus(400);
      } else {
        res.status(200).send(docId);
      }
    });

  return router;
}

module.exports = baseRouter;
