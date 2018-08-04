const docs = require('../../firebase/docs');
const baseRouter = require('../router/base');

const router = baseRouter(docs.users.userDoc);

module.exports = router;
