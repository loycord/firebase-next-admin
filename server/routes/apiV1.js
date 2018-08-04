const express = require('express');
const router = express.Router();
const firebase = require('../firebase');
const admin = firebase.admin;

router.get('/users', async (req, res) => {
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    return admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        let users = [];
        listUsersResult.users.forEach(function(userRecord) {
          // console.log("user", userRecord.toJSON());

          users.push(userRecord.toJSON());
        });

        return users;
      
        if (listUsersResult.pageToken) {
          // List next batch of users.
          // listAllUsers(listUsersResult.pageToken)
        }
      })
      .catch(function(error) {
        console.log("Error listing users:", error);
        return false;
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  const users = await listAllUsers();
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(404);
  }
});

module.exports = router;