import { fetchEventsData, fetchDataFromFirestore, fetchUpdateCards } from '@/services/fetch_data_from_firestore';
import DashboardClient from './DashboardClient';

// Force dynamic rendering to avoid build-time Firebase issues
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    let events = [];
    let announcements = [];
    let updateCards = [];

    // Fetch all events (upcoming + past + present)
    try {
        const data = await fetchEventsData('events');
        if (Array.isArray(data) && data.length > 0) {
            events = data.map((event) => ({
                ...event,
                event_date:
                    typeof event.event_date?.toDate === 'function'
                        ? event.event_date.toDate().toISOString()
                        : event.event_date,
            }));
        }
    } catch (error) {
        console.error('Error fetching events for dashboard:', error);
    }

    // Fetch announcements
    try {
        const fetched = await fetchDataFromFirestore(
            'homescreen_data',
            'latest_announcement'
        );
        if (fetched && fetched.annoucements) {
            announcements = fetched.annoucements;
        }
    } catch (error) {
        console.error('Error fetching announcements for dashboard:', error);
    }

    // Fetch update cards for the carousel
    try {
        const fetched = await fetchUpdateCards('update_cards');
        if (Array.isArray(fetched)) {
            updateCards = fetched;
        }
    } catch (error) {
        console.error('Error fetching update cards for dashboard:', error);
    }

    return <DashboardClient events={events} announcements={announcements} updateCards={updateCards} />;
}
