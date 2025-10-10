import admin from "firebase-admin";

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
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (privateKey && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
      adminInstance = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
        projectId: process.env.FIREBASE_PROJECT_ID,
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      db = admin.firestore();
      console.log("Firebase Admin initialized successfully with environment variables");
    } else {
      console.log("Missing Firebase environment variables, using mock database");
      db = createMockDb();
      adminInstance = null;
    }
  } catch (error) {
    console.log("Firebase Admin initialization failed, using mock database:", error.message);
    db = createMockDb();
    adminInstance = null;
  }
} else {
  adminInstance = admin.app();
  db = admin.firestore();
}

export { adminInstance, admin, db };
