import { doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase/server//firebase_admin';

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


export const fetchQuestionsData = async (id = null) => {

    try {
        const processAnswers = (answers) => {
            if (!answers) return [];
            if (Array.isArray(answers)) {
                return answers.map((answer) => ({
                    answerText: answer.answerText || "",
                    author: {
                        name: answer.author?.name || "",
                        profilePicUrl: answer.author?.profilePicUrl || "",
                    },
                    createdAt: answer.createdAt ? answer.createdAt.toDate() : new Date(),
                    views: answer.views || 0,
                }));
            }
            return [
                {
                    answerText: answers.answerText || "",
                    author: {
                        name: answers.author?.name || "",
                        profilePicUrl: answers.author?.profilePicUrl || "",
                    },
                    createdAt: answers.createdAt ? answers.createdAt.toDate() : new Date(),
                    views: answers.views || 0,
                },
            ];
        };

        // ✅ Case 1: fetch single document by id
        if (id?.id) {
            const docRef = db.collection("questions").doc(id.id);
            const docSnap = await docRef.get();

            if (!docSnap.exists) {
                console.error(`No document found with id ${id.id}`);
                return []; // always return array, empty if not found
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
                    answers: processAnswers(data.answers),
                    views: data.views || 0,
                },
            ];
        }

        // ✅ Case 2: fetch all documents
        const snapshot = await db.collection("questions").get();

        if (snapshot.empty) {
            console.error("No documents found in collection questions");
            return [];
        }

        const questions = snapshot.docs.map((doc) => {
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
                answers: processAnswers(data.answers),
                views: data.views || 0,
            };
        });


        return questions;
    } catch (error) {
        console.error("Error fetching questions data:", error);
        return [];
    }
};


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

export const fetchEventsData = async (collection) => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        let events = [];
        if (docSnap.empty) {
            console.error(`No documents found in collection events`);
            return [];
        }
        docSnap.forEach(doc => {
            events.push({ id: doc.id, ...doc.data() });
        });
        return events;
    } catch (error) {
        console.error('Error fetching events data:', error);


        return [];
    }
}


export async function fetchAllSlugs() {
    try {

        const snapshot = await db.collection("questions").get();
        if (snapshot.empty) {
            console.error("No documents found in collection questions");
            return [];
        }
        return snapshot.docs.map((doc) => doc.id); // <-- return string only

    } catch (error) {
        console.error("Error fetching slugs:", error);
        return [];
    }
}

export const fetchEventsById = async (collection, docId) => {
    try {
        const docRef = db.collection(collection).doc(docId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            // console.error(`Document ${docId} does not exist in collection ${collection}`);
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
