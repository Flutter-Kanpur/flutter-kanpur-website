import { fetchCoreTeamData, fetchCoreTeamSections } from '@/services/fetch_data_from_firestore';
import { normalizeCoreTeamMember, groupCoreTeamBySection } from '@/lib/normalizeCoreTeamMember';
import CoreTeamPageContainer from '@/components/coreteam/CoreTeamPageContainer';


export default async function CoreTeamPage() {
  let initialSections = [];
  try {
    const flat = await fetchCoreTeamData('members');
    if (Array.isArray(flat) && flat.length > 0) {
      const normalized = flat.map(normalizeCoreTeamMember);
      initialSections = groupCoreTeamBySection(normalized);
    } else {
      const sectionDocs = await fetchCoreTeamSections('members');
      if (Array.isArray(sectionDocs) && sectionDocs.length > 0) {
        initialSections = sectionDocs;
      }
    }
  } catch (e) {
    console.error('Core team fetch error:', e);
  }
  return <CoreTeamPageContainer initialSections={initialSections} />;
}
