'use server';
import { db } from '../lib/firebase/server/firebase_admin';

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
};

/**
 * Fetches core team the same way as members: one collection, one document per person.
 * Use this for a flat structure (like /members). Collection: members.
 * Each document = one person with: name, role, section, photo/photoURL, joinDate, bio,
 * skills (array), github, website, linkedin. Group by "section" on the page to show sections.
 */
export const fetchCoreTeamData = async (collection = 'members') => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        const list = [];
        if (docSnap.empty) return [];
        docSnap.forEach(doc => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    } catch (error) {
        console.error('Error fetching core team data:', error);
        return [];
    }
};

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
/*
/** Fetch a single blog document by id from Firestore (e.g. for /blog/[id]) 
export const fetchBlogById = async (collection, docId) => {
    try {
        const data = await fetchDataFromFirestore(collection, docId);
        if (!data) return null;
        return { id: docId, ...data };
    } catch (error) {
        console.error('Error fetching blog by id:', error);
        return null;
    }
}
*/
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

export const fetchContestsData = async (collection) => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        let contests = [];
        if (docSnap.empty) {
            return [];
        }
        docSnap.forEach(doc => {
            contests.push({ id: doc.id, ...doc.data() });
        });
        return contests;
    } catch (error) {
        console.error('Error fetching contests data:', error);
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

export const fetchOpenCallsData = async (collection='open_call_applications') => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        let list = [];
        if (docSnap.empty) return [];
        docSnap.forEach(doc => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    } catch (error) {
        console.error('Error fetching open calls data:', error);
        return [];
    }
};

/**
 * Fetches core team from Firestore. This is the only function used for core team data.
 *
 * WHERE: src/services/fetch_data_from_firestore.js
 *
 * USAGE:
 *   const sections = await fetchCoreTeamSections('members');
 *   // sections = [{ id, title, expanded, members: [{ id, name, role, photo, ... }] }]
 *
 * FIRESTORE:
 *   Collection: members (one document per section, e.g. "App Team", "Organisors").
 *   Each document: { title: string, members: array }.
 *   Each member: id, name (or displayName), role, joinDate (or join_date), roleLong, bio,
 *   skills (array), github, website, linkedin, photo (or profilePic, imageUrl, avatar, avatarUrl,
 *   profileImage, image) — photo must be a full URL string for profile pictures.
 *
 * See src/docs/CORE_TEAM_DATABASE.md for full structure and examples.
 */
export const fetchCoreTeamSections = async (collection = 'members') => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        const sections = [];
        if (docSnap.empty) return [];
        docSnap.forEach((doc) => {
            const d = doc.data();
            const members = Array.isArray(d.members) ? d.members.map((m, i) => ({
                id: m.id || m.memberId || doc.id + '-' + i,
                name: m.name || m.displayName || 'Unknown',
                role: m.role || 'Member',
                joinDate: m.joinDate || m.join_date || 'March 2026',
                roleLong: m.roleLong || m.role_long || m.role,
                bio: m.bio || 'Part of the Flutter Kanpur community.',
                skills: Array.isArray(m.skills) ? m.skills : (m.skills ? [m.skills] : ['Flutter', 'Dart']),
                github: m.github || m.githubUrl || '#',
                website: m.website || m.websiteUrl || '#',
                linkedin: m.linkedin || m.linkedinUrl || '#',
                photo: m.photo || m.profilePic || m.imageUrl || m.avatar || m.avatarUrl || m.profileImage || m.image || '',
            })) : [];
            sections.push({
                id: d.sectionId || d.id || doc.id,
                title: d.title || doc.id,
                expanded: (d.sectionId || d.id || doc.id) === 'app-team',
                members,
            });
        });
        return sections;
    } catch (error) {
        console.error('Error fetching core team sections:', error);
        return [];
    }
};

export const fetchOpenCallById = async (collection, docId) => {
    try {
        const data = await fetchDataFromFirestore(collection, docId);
        if (!data) return null;
        return { id: docId, ...data };
    } catch (error) {
        console.error('Error fetching open call by id:', error);
        return null;
    }
};

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
};

export const fetchProjectsData = async (collection = 'projects') => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        const list = [];
        if (docSnap.empty) return [];
        docSnap.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return [];
    }
};

export const fetchProjectById = async (collection = 'projects', docId) => {
    try {
        const docRef = db.collection(collection).doc(docId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) return null;
        const data = docSnap.data();
        return data ? { id: docSnap.id, ...data } : null;
    } catch (error) {
        console.error('Error fetching project by id:', error);
        return null;
    }
};

export const fetchJobsData = async (collection = 'suggested_jobs') => {
    try {
        const docRef = db.collection(collection);
        const docSnap = await docRef.get();
        const list = [];
        if (docSnap.empty) return [];
        docSnap.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    } catch (error) {
        console.error('Error fetching jobs data:', error);
        return [];
    }
};

export const fetchJobById = async (collection = 'suggested_jobs', docId) => {
    try {
        const docRef = db.collection(collection).doc(docId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) return null;
        const data = docSnap.data();
        return data ? { id: docSnap.id, ...data } : null;
    } catch (error) {
        console.error('Error fetching job by id:', error);
        return null;
    }
}
