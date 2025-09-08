import { db } from '../lib/firebase/firebase_admin';

export const fetchDataFromFirestore = async (collection, docId) => {
    try {
        const docRef = db.collection(collection).doc(docId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            console.error(`Document ${docId} does not exist in collection ${collection}`);
            return null;
        }
        const data = docSnap.data();
        if (!data) {
            console.error(`No data found in document ${docId} of collection ${collection}`);
            return null;
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching stats data:', error);
        return [];
    }
}

export const fetchMembersData = async (collection) => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        let members = [];
        if (docSnap.empty) {
            console.error(`No documents found in collection members`);
            return [];
        }
        docSnap.forEach(doc => {
            members.push({ id: doc.id, ...doc.data() });
        });
        return members;
    } catch (error) {
        console.error('Error fetching members data:', error);
        return [];
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
    console.log("data is the following ",data)
    return data.upcoming_events || [];
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}


export const fetchBlogsData = async (collection) => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        let blogs = [];
        if (docSnap.empty) {
            console.error(`No documents found in collection blogs`);
            return [];
        }
        docSnap.forEach(doc => {
            blogs.push({ id: doc.id, ...doc.data() });
        });
        return blogs;
    } catch (error) {
        console.error('Error fetching blogs data:', error);
        return [];
    }
}