import { fetchContestsData } from '@/services/fetch_data_from_firestore';
import { normalizeContest } from '@/lib/normalizeContest';
import Contest2Container from '@/components/contest2/Contest2Container';

export default async function Contest2Page() {
  let initialContests = [];
  try {
    const raw = await fetchContestsData('contests');
    initialContests = Array.isArray(raw) ? raw.map(normalizeContest) : [];
  } catch (e) {
    console.error('Contest2 fetch error:', e);
  }
  return <Contest2Container initialContests={initialContests} />;
}
