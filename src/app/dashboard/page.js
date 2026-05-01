// import { fetchEventsData, fetchDataFromFirestore } from '@/services/fetch_data_from_firestore';
// import DashboardClient from './DashboardClient';

// // Force dynamic rendering to avoid build-time Firebase issues
// export const dynamic = 'force-dynamic';

// export default async function DashboardPage() {
//     let events = [];
//     let announcements = [];

//     // Fetch all events (upcoming + past + present)
//     try {
//         const data = await fetchEventsData('events');
//         if (Array.isArray(data) && data.length > 0) {
//             events = data.map((event) => ({
//                 ...event,
//                 event_date:
//                     typeof event.event_date?.toDate === 'function'
//                         ? event.event_date.toDate().toISOString()
//                         : event.event_date,
//             }));
//         }
//     } catch (error) {
//         console.error('Error fetching events for dashboard:', error);
//     }

//     // Fetch announcements
//     try {
//         const fetched = await fetchDataFromFirestore(
//             'homescreen_data',
//             'latest_announcement'
//         );
//         if (fetched && fetched.annoucements) {
//             announcements = fetched.annoucements;
//         }
//     } catch (error) {
//         console.error('Error fetching announcements for dashboard:', error);
//     }

//     return <DashboardClient events={events} announcements={announcements} />;
// }

import { fetchEventsData, fetchDataFromFirestore } from '@/services/fetch_data_from_firestore';
import DashboardClient from './DashboardClient';

// Force dynamic rendering to avoid build-time Firebase issues
export const dynamic = 'force-dynamic';

// ✅ Reusable serializer (handles ALL Firestore timestamps automatically)
function serializeData(obj) {
    const newObj = {};

    for (const key in obj) {
        const value = obj[key];

        if (value && typeof value.toDate === 'function') {
            newObj[key] = value.toDate().toISOString(); // ✅ convert timestamp
        } else {
            newObj[key] = value;
        }
    }

    return newObj;
}

export default async function DashboardPage() {
    let events = [];
    let announcements = [];

    // 🔹 Fetch Events
    try {
        const data = await fetchEventsData('events');

        if (Array.isArray(data) && data.length > 0) {
            events = data.map((event) => serializeData(event));
        }
    } catch (error) {
        console.error('Error fetching events for dashboard:', error);
    }

    // 🔹 Fetch Announcements
    try {
        const fetched = await fetchDataFromFirestore(
            'homescreen_data',
            'latest_announcement'
        );

        if (fetched && fetched.annoucements) {
            announcements = fetched.annoucements.map((item) =>
                serializeData(item)
            );
        }
    } catch (error) {
        console.error('Error fetching announcements for dashboard:', error);
    }

    return <DashboardClient events={events} announcements={announcements} />;
}