const users = require('./users');
const posts = require('./posts');

const docsModel = {
  users: users.docModel,
  posts: posts.docModel
};

module.exports = { users, posts, docsModel };
