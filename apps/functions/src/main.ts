/* eslint-disable @typescript-eslint/no-unused-vars */
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.listAllUsers = functions.https.onRequest((req, res) => {
  const allUsers = [];

  return admin
    .auth()
    .listUsers()
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        const userData = userRecord.toJSON();
        allUsers.push(userData);
      });
      res.status(200).send(JSON.stringify(allUsers));
    })
    .catch((error) => {
      console.log('Error listing users:', error);
      res.status(500).send(error);
    });
});