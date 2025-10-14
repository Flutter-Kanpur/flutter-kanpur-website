// import admin from "firebase-admin";

// // Create a mock database for build time
// const createMockDb = () => ({
//   collection: () => ({
//     doc: () => ({
//       get: async () => ({ exists: false, data: () => null })
//     }),
//     get: async () => ({ empty: true, docs: [] })
//   })
// });

// // Initialize Firebase Admin
// let db;
// let adminInstance = null;

// if (!admin.apps.length) {
//   try {
//     // In Firebase Functions environment, use default credentials
//     adminInstance = admin.initializeApp({
//       projectId: process.env.GOOGLE_CLOUD_PROJECT || 'flutter-kanpur'
//     });
//     db = admin.firestore();
//     console.log("Firebase Admin initialized successfully");
//   } catch (error) {
//     console.log("Firebase Admin initialization failed, using mock database:", error.message);
//     db = createMockDb();
//   }
// } else {
//   adminInstance = admin.app();
//   db = admin.firestore();
// }

// export { adminInstance as admin, db };


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
