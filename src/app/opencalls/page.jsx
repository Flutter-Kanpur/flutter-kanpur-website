import OpenCallsContainer from '@/components/OpenCalls/OpenCallsContainer';
import { fetchOpenCallsData } from '@/services/fetch_data_from_firestore';

export default async function Page() {
  const calls = await fetchOpenCallsData('open_call_applications'); // server safe
  return <OpenCallsContainer initialCalls={calls} />;
}
