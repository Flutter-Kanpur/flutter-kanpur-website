import * as functions from "firebase-functions";
import next from "next";
import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dev = false; // always production in Functions

// -------------------
// Firebase Admin init
// -------------------
if (!admin.apps.length) {
    try {
        admin.initializeApp({ credential: admin.credential.applicationDefault() });
        console.log("✅ Firebase Admin initialized with ADC");
    } catch (err) {
        const serviceAccount = JSON.parse(
            fs.readFileSync(join(__dirname, "flutter-kanpur-website-firebase-adminsdk.json"), "utf-8")
        );
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        console.log("✅ Firebase Admin initialized with service account JSON");
    }
}

// -------------------
// Next.js App handler
// -------------------
const app = next({
    dev,
    conf: {
        distDir: join(__dirname, ".next"),
    },
});

const handle = app.getRequestHandler();
let isPrepared = false;

export const nextApp = onRequest(async (req, res) => {
    try {
        if (!isPrepared) {
            console.log("Preparing Next.js app (cold start)...");
            await app.prepare();
            isPrepared = true;
            console.log("✅ Next.js app prepared successfully");
        }

        // Normalize URL for Next.js
        let url = req.url || "/";
        if (!url.startsWith("/")) url = "/" + url;

        return handle(req, res, url);
    } catch (err) {
        console.error("❌ Next.js handler error:", err);
        res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
            stack: dev ? err.stack : undefined,
        });
    }
});