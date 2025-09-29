import * as functions from "firebase-functions";
import next from "next";
import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// -------------------
// Setup __dirname
// -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -------------------
// Firebase Admin init
// -------------------
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
        console.log("✅ Firebase Admin initialized with ADC");
    } catch (err) {
        console.warn("⚠️ ADC not available, trying service account JSON...");
        try {
            const serviceAccountPath = join(
                __dirname,
                "flutter-kanpur-website-firebase-adminsdk.json"
            );
            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            console.log("✅ Firebase Admin initialized with service account JSON");
        } catch (jsonErr) {
            console.error("❌ Failed to initialize Firebase Admin with JSON:", jsonErr);
            throw jsonErr;
        }
    }
}

// -------------------
// Next.js app setup
// -------------------
const dev = process.env.NODE_ENV !== "production";

const app = next({
    dev,
    conf: {
        distDir: join(__dirname, ".next"),
    },
});

const handle = app.getRequestHandler();
let isPrepared = false;

// -------------------
// Firebase Function
// -------------------
export const nextApp = onRequest(async (req, res) => {
    try {
        // Prepare Next.js app only once
        if (!isPrepared) {
            console.log("Preparing Next.js app (cold start)...");
            await app.prepare();
            isPrepared = true;
            console.log("✅ Next.js app prepared successfully");
        }

        // Ensure req.url is never empty
        if (!req.url || req.url === "") req.url = "/";

        return handle(req, res);
    } catch (err) {
        console.error("❌ Next.js handler error:", err);

        // Give helpful info for dev vs production
        res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
            stack: dev ? err.stack : undefined,
        });
    }
});
