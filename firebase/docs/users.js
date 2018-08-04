const firebase = require('../setup');
const models = require('../models');

const rootRef = firebase.firestore().collection('users');

const docModel = {
  displayName: 'string',
  email: 'string'
};

const userDoc = new models.FireStoreModel(rootRef, docModel);

module.exports = { docModel, userDoc };
