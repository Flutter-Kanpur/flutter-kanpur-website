// import 'server-only';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validate that all required environment variables are present
const requiredEnvVars = ['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

// if (missingEnvVars.length > 0) {
//   console.error('Missing required environment variables:', missingEnvVars);
//   // Don't throw error, just log and continue with fallback
// }

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

export async function fetchAllSlugs() {
  try {
    const questionsRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsRef);

    if (snapshot.empty) {
      console.error("No documents found in collection questions");
      return [];
    }

    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

export async function fetchQuestionsData(id = null) {
  try {
    if (id?.id) {
      // Fetch single document by id
      const docRef = doc(db, 'questions', id.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error(`No document found with id ${id.id}`);
        return [];
      }

      const data = docSnap.data();
      return [
        {
          id: docSnap.id,
          title: data.title || "",
          body: data.body || "",
          author: {
            name: data.author?.name || "",
            profilePicUrl: data.author?.profilePicUrl || "",
          },
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          tags: data.tags || [],
          answers: data.answers || [],
          views: data.views || 0,
        },
      ];
    } else {
      // Fetch all documents
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);

      if (snapshot.empty) {
        console.error("No documents found in collection questions");
        return [];
      }

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          body: data.body || "",
          author: {
            name: data.author?.name || "",
            profilePicUrl: data.author?.profilePicUrl || "",
          },
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          tags: data.tags || [],
          answers: data.answers || [],
          views: data.views || 0,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching questions data:", error);
    return [];
  }
}

export const setUserDataToFireStore = async (payload) => {
  try {
    const docRef = collection(db, 'users');
    const data = await addDoc(docRef, payload);
    await updateDoc(doc(db, 'users', data.id), { docID: data.id });
  } catch (error) {
    console.log(error, "error");
  }
}

// Check if user exists in Firestore by email
export const checkUserExistsInFirestore = async (email) => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const userExists = snapshot.docs.some(doc => {
      const data = doc.data();
      return data.email === email;
    });
    
    return userExists;
  } catch (error) {
    console.error("Error checking user in Firestore:", error);
    return false;
  }
}