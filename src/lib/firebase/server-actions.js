import 'server-only';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchStatsData() {
  try {
    const docRef = doc(db, 'homescreen_data', 'stats_data');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.error('Stats document does not exist');
      return [];
    }

    const data = docSnap.data();
    
    return [
      {
        id: 1,
        title: data.community_member || '-',
        description: 'Community Members',
      },
      {
        id: 2,
        title: data.events_hosted || '-',
        description: 'Events Hosted',
      },
      {
        id: 3,
        title: data.community_lead || '-',
        description: 'Community Leads',
      },
    ];
  } catch (error) {
    console.error('Error fetching stats data:', error);
    return [];
  }
}

export async function fetchLatestAnnouncement() {
  try {
    const docRef = doc(db, 'homescreen_data', 'latest_announcement');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.error('Announcement document does not exist');
      return "";
    }

    const data = docSnap.data();
    return data.latest_announcements || "";
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return "";
  }
}

export async function fetchUpcomingEvents() {
  try {
    const docRef = doc(db, 'homescreen_data', 'events');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.error('Events document does not exist');
      return [];
    }

    const data = docSnap.data();
    return data.upcoming_events || [];
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}
