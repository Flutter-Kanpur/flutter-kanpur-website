import admin from 'firebase-admin';

// console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // or use cert() with a service account key
        // databaseURL: "https://flutter-kanpur.firebaseio.com" // optional, for RTDB
    });
}

const db = admin.firestore();

export { admin, db };
