/* eslint-disable @typescript-eslint/no-unused-vars */
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import Stripe from 'stripe';

import * as cors from 'cors';
const SECRET_KEY =
  'sk_test_51IYfjEKp4XrdRIV53nbSZtxBxotT560niMA6j14rAilAblNfhIFpANboVG7y8GQRecQ2QxE9l5iZpZA2wQcu8Hbg00C6xaPMta';
admin.initializeApp();
const stripe = new Stripe(SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const corsHandler = cors({ origin: true });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: functions.config().mail.from,
    pass: functions.config().mail.pwd,
  },
});

async function sendWelcomeEmail(snap) {
  const mailOptions = {
    to: snap.data().email,
    subject: 'Your request recevied',
    html: `<h1>Welcome to CTB</h1>
           <div>
           <p>
             Thank you for choosing us as your service provider, we'll review your application shortly and send you an email with login credentials to use your own custom dashboard, where you can manage your booking and add tables.
           </p>
           <p> Thank you </p>
             <p> Team CTB </p>
             </div>`,
  };
  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log('Sent!');
  });
}
async function sendLoginCredentialsEmail(snap) {
  const mailOptions = {
    to: snap.data().email,
    subject: 'CTB - Login Credentials',
    html: `<h1>Welcome to CTB</h1>
             <div>
             <p>
             Email: ${snap.data().email}
           </p>
             <p>
             Here is the link to dashbaord
             <a href="https://ctb.vercel.app/">https://ctb.vercel.app/</a>
           </p>
             <p>
               Here is your password:
                <b>${snap.data().id}</b>
             </p>
             <p> Thank you </p>
               <p> Team CTB </p>
               </div>`,
  };
  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log('Sent!');
  });
}

exports.sendLoginCredentials = functions.firestore
  .document('companies/{companiesId}')
  .onCreate(sendLoginCredentialsEmail);

exports.sendEmail = functions.firestore
  .document('company_requests/{company_requestsId}')
  .onCreate(sendWelcomeEmail);

exports.setRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: data.admin,
        companyUser: data.companyUser,
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
  return corsHandler(req, res, () => {
    // your function body here - use the provided req and res from cors
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
});

exports.deleteUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .deleteUser(data.uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
});

exports.isUserAdmin = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUser(data.uid)
    .then((userRecord) => {
      // console.log(userRecord.customClaims['admin']);
      if (!userRecord.customClaims['admin']) {
        return false;
      }
      return userRecord.customClaims['admin'];
    })
    .catch((error) => {
      console.log('user not admin', error);
    });
});

exports.createUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      // emailVerified: false,
      phoneNumber: data.phoneNumber,
      password: data.password,
      displayName: data.displayName,
      // photoURL: 'http://www.example.com/12345678/photo.png',
      // disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
});

exports.stripeHandler = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method === 'POST') {
      try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'SEK',
        });

        res.status(200).send(paymentIntent.client_secret);
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  });
});
