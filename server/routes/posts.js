const docs = require('../../firebase/docs');
const baseRouter = require('../router/base');

const router = baseRouter(docs.posts.postDoc);

module.exports = router;
