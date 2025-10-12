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
import fs from "fs";

const createMockDb = () => ({
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => null })
    }),
    get: async () => ({ empty: true, docs: [] })
  })
});

let db;
let adminInstance = null;

if (!admin.apps.length) {
  try {
    // Path to your service account file
    const serviceAccountPath = path.resolve("./flutter-kanpur-website-firebase-adminsdk.json");

    let adminConfig = {};

    if (fs.existsSync(serviceAccountPath)) {
      // ✅ Local development: use service account
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
      adminConfig = {
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      };
      console.log("Using local service account for Firebase Admin");
    } else {
      // ✅ Firebase cloud environment: use default credentials
      adminConfig = {
        credential: admin.credential.applicationDefault(),
        projectId: process.env.GOOGLE_CLOUD_PROJECT || "flutter-kanpur",
      };
      console.log("Using default Firebase credentials");
    }

    adminInstance = admin.initializeApp(adminConfig);
    db = admin.firestore();
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization failed, using mock DB:", error.message);
    db = createMockDb();
  }
} else {
  adminInstance = admin.app();
  db = admin.firestore();
}

export { adminInstance as admin, db };
