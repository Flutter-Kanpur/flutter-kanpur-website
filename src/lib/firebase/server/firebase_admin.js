import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve("flutter-kanpur-website-firebase-adminsdk.json"); // or the relative path

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();

export { db };
