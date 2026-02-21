import { fetchProjectsData } from '@/services/fetch_data_from_firestore';
import { normalizeProject } from '@/lib/normalizeProject';
import ProjectsPageContainer from '@/components/projects/ProjectsPageContainer';
import './projects.css';

export default async function ProjectsPage() {
  let initialProjects = [];
  try {
    const raw = await fetchProjectsData('projects');
    initialProjects = Array.isArray(raw) ? raw.map(normalizeProject) : [];
  } catch (e) {
    console.error('Projects fetch error:', e);
  }
  return <ProjectsPageContainer initialProjects={initialProjects} />;
}
