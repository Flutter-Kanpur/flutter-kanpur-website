#!/usr/bin/env node
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path to service account JSON - prefer env var, fallback to bundled key in repo
const serviceAccountPath = process.env.SERVICE_ACCOUNT_JSON_PATH || path.join(__dirname, '..', 'functions', 'flutter-kanpur-website-firebase-adminsdk.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Service account JSON not found at', serviceAccountPath);
  console.error('Set SERVICE_ACCOUNT_JSON_PATH env var to point to your service account JSON.');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || (serviceAccount.project_id + '.appspot.com');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

async function getSignedUrlForPath(p) {
  if (!p) return '';
  if (p.startsWith('http')) return p;
  // normalize gs:// and leading bucket paths
  let filePath = p.replace(/^gs:\/\//, '');
  if (filePath.startsWith(storageBucket + '/')) filePath = filePath.slice((storageBucket + '/').length);
  filePath = filePath.replace(/^\/+/, '');
  const file = bucket.file(filePath);
  try {
    const [exists] = await file.exists();
    if (!exists) {
      console.warn('Storage file does not exist:', filePath);
      return '';
    }
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return url;
  } catch (e) {
    console.error('Error creating signed URL for', filePath, e.message || e);
    return '';
  }
}

async function processMembersCollection() {
  const snapshot = await db.collection('members').get();
  if (snapshot.empty) {
    console.log('No documents in members collection');
    return;
  }
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (Array.isArray(data.members)) {
      let changed = false;
      const members = await Promise.all(data.members.map(async (m) => {
        const photo = m.photo || m.profilePic || m.imageUrl || m.avatar || m.avatarUrl || m.profileImage || m.image || '';
        if (photo && !photo.startsWith('http')) {
          const url = await getSignedUrlForPath(photo);
          if (url) { m.photo = url; changed = true; }
        }
        return m;
      }));
      if (changed) {
        await doc.ref.update({ members });
        console.log(`Updated members photos in doc ${doc.id}`);
      } else {
        console.log(`No change for doc ${doc.id}`);
      }
    } else {
      const photo = data.photo || data.profilePic || data.imageUrl || data.avatar || data.avatarUrl || data.profileImage || data.image || '';
      if (photo && !photo.startsWith('http')) {
        const url = await getSignedUrlForPath(photo);
        if (url) {
          await doc.ref.update({ photo: url });
          console.log(`Updated photo for doc ${doc.id}`);
        } else {
          console.log(`Could not create URL for doc ${doc.id} (${photo})`);
        }
      } else {
        console.log(`No change for doc ${doc.id}`);
      }
    }
  }
}

processMembersCollection()
  .then(() => { console.log('Done.'); process.exit(0); })
  .catch((err) => { console.error(err); process.exit(1); });
