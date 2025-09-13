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

export const fetchQuestionsData = async () => {
    try {
        const questionsRef = db.collection('questions');
        const snapshot = await questionsRef.get();
        let questions = [];
        
        if (snapshot.empty) {
            console.error('No documents found in collection questions');
            return [];
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
                        let processedAnswers = [];
            
            if (data.answers) {
                if (Array.isArray(data.answers)) {
                    processedAnswers = data.answers.map(answer => ({
                        answerText: answer.answerText || '',
                        author: {
                            name: answer.author?.name || '',
                            profilePicUrl: answer.author?.profilePicUrl || ''
                        },
                        createdAt: answer.createdAt ? answer.createdAt.toDate() : new Date(),
                        views: answer.views || 0
                    }));
                } else {
                    processedAnswers = [{
                        answerText: data.answers.answerText || '',
                        author: {
                            name: data.answers.author?.name || '',
                            profilePicUrl: data.answers.author?.profilePicUrl || ''
                        },
                        createdAt: data.answers.createdAt ? data.answers.createdAt.toDate() : new Date(),
                        views: data.answers.views || 0
                    }];
                }
            }
            
            questions.push({
                id: doc.id,
                title: data.title || '',
                body: data.body || '',
                author: {
                    name: data.author?.name || '',
                    profilePicUrl: data.author?.profilePicUrl || ''
                },
                createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                tags: data.tags || [],
                answers: processedAnswers,
                views: data.views || 0
            });
        });
        
        return questions;
    } catch (error) {
        console.error('Error fetching questions data:', error);
        return [];
    }
}