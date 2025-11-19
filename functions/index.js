import * as functions from "firebase-functions/v2";
import next from "next";
import admin from "firebase-admin";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// -------------------
// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -------------------
// Firebase Admin init (ENV-based)
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: serviceAccount.project_id,
                clientEmail: serviceAccount.client_email,
                privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
            }),
        });

        console.log("✅ Firebase Admin initialized with ENV service account");
    } catch (err) {
        console.error("❌ Failed to initialize Firebase Admin:", err);
    }
}

// -------------------
// Next.js app setup
const dev = process.env.NODE_ENV !== "production";

const app = next({
    dev,
    conf: { distDir: ".next" },
});

const handle = app.getRequestHandler();
let isPrepared = false;

// -------------------
// Firebase Function (v2)
export const nextApp = functions.https.onRequest(
    {
        memory: "512Mi",
        timeoutSeconds: 60,
        maxInstances: 20,
    },
    async (req, res) => {
        try {
            if (!isPrepared) {
                await app.prepare();
                isPrepared = true;
            }

            if (!req.url || req.url === "") req.url = "/";

            return handle(req, res);
        } catch (err) {
            console.error("❌ Next.js handler error:", err);
            res.status(500).json({
                error: "Internal Server Error",
                message: err.message,
                stack: dev ? err.stack : undefined,
            });
        }
    }
);
