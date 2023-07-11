const admin = require('firebase-admin');

const serviceAccount = require('./creds.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
console.log('db', db);
