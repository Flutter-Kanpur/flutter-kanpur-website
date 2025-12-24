import * as functions from "firebase-functions/v2";
import next from "next";
import admin from "firebase-admin";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -----------------------------
// Firebase Admin Initialization
// -----------------------------
if (!admin.apps.length) {
    try {
        const raw = functions.config().adminsdk.key;
        const serviceAccount = JSON.parse(raw);

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: serviceAccount.project_id,
                clientEmail: serviceAccount.client_email,
                privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
            }),
        });

        console.log("✅ Firebase Admin initialized using functions.config()");
    } catch (err) {
        console.error("❌ Failed to init Firebase Admin:", err);
    }
}

// -----------------------------
// Next.js Server Initialization
// -----------------------------
const dev = process.env.NODE_ENV !== "production";

const app = next({
    dev,
    conf: { distDir: ".next" },
});

const handle = app.getRequestHandler();
let prepared = false;

// -----------------------------
// Cloud Function (Next.js handler)
// -----------------------------
export const nextApp = functions.https.onRequest(
    {
        memory: "512Mi",
        timeoutSeconds: 60,
        maxInstances: 20,
    },
    async (req, res) => {
        try {
            if (!prepared) {
                await app.prepare();
                prepared = true;
            }

            if (!req.url) req.url = "/";

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
