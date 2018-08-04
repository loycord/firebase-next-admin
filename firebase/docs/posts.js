const firebase = require('../setup');
const models = require('../models');

const rootRef = firebase.firestore().collection('posts');

const docModel = {
  content: 'string'
};

const postDoc = new models.FireStoreModel(rootRef, docModel);

module.exports = { docModel, postDoc };