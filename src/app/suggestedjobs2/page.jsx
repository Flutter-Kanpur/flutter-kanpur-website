import { fetchJobsData } from '@/services/fetch_data_from_firestore';
import { normalizeJob } from '@/lib/normalizeJob';
import SuggestedJobs2Container from '@/components/suggestedjobs2/SuggestedJobs2Container';
import './suggestedjobs2.css';

export default async function SuggestedJobs2Page() {
  let initialJobs = [];
  try {
    const raw = await fetchJobsData('suggested_jobs');
    initialJobs = Array.isArray(raw) ? raw.map(normalizeJob) : [];
  } catch (e) {
    console.error('Suggested jobs fetch error:', e);
  }
  return <SuggestedJobs2Container initialJobs={initialJobs} />;
}
