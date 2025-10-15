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
// Firebase Admin init
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
        console.log("✅ Firebase Admin initialized with ADC");
    } catch (err) {
        console.warn("⚠️ ADC not available, trying service account JSON...");
        const serviceAccountPath = join(__dirname, "flutter-kanpur-website-firebase-adminsdk.json");
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("✅ Firebase Admin initialized with service account JSON");
    }
}

// -------------------
// Next.js app setup
const dev = process.env.NODE_ENV !== "production";

const app = next({
    dev,
    conf: { distDir: ".next" }, // Ensure the path is correct
});

const handle = app.getRequestHandler();
let isPrepared = false;

// -------------------
// Firebase Function (v2)
export const nextApp = functions.https.onRequest(
    {
        memory: "512Mi",       // adjust memory if needed
        timeoutSeconds: 60,
        maxInstances: 20,
    },
    async (req, res) => {
        try {
            // Cold start preparation
            if (!isPrepared) {
                console.log("Preparing Next.js app...");
                await app.prepare();
                isPrepared = true;
                console.log("✅ Next.js app prepared successfully");
            }

            // Fallback for empty URLs
            if (!req.url || req.url === "") req.url = "/";

            // Forward request to Next.js
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
