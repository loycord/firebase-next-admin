const admin = require('firebase-admin');
const serviceAccount = require('./admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

module.exports = admin;
