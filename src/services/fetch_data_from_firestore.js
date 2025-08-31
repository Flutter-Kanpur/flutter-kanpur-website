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