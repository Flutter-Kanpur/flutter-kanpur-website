import { fetchEventsData } from '@/services/fetch_data_from_firestore';
import { normalizeEvent } from '@/lib/normalizeEvent';
import Event2Container from '@/components/event2/Event2Container';
import './event2.css';

export default async function Event2Page() {
  let initialEvents = [];
  try {
    const raw = await fetchEventsData('events');
    initialEvents = Array.isArray(raw) ? raw.map(normalizeEvent) : [];
  } catch (e) {
    console.error('Event2 fetch error:', e);
  }
  return <Event2Container initialEvents={initialEvents} />;
}
