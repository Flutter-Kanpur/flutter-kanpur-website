import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import { fetchProjectById } from '@/services/fetch_data_from_firestore';
import { normalizeProject } from '@/lib/normalizeProject';
import '../projects.css';

export default async function ProjectDetailPage({ params }) {
  const resolved = await params;
  const id = typeof resolved?.id === 'string' ? resolved.id : String(resolved?.id ?? '');
  if (!id) notFound();

  let raw = null;
  try {
    raw = await fetchProjectById('projects', id);
  } catch (e) {
    console.error('Project fetch error:', e);
  }
  if (!raw) notFound();

  const project = normalizeProject(raw);
  const sharedOn = project.sharedOn || project.postedOn || '—';
  const about = project.about || 'No description available.';
  const features = project.features || about;
  const screenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0
    ? project.screenshots
    : [null, null];

  return (
    <div className="proj-wrapper">
      <header className="proj-appbar">
        <Link href="/projects" className="proj-back" aria-label="Back to Projects">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </Link>
        <h1 className="proj-title">Projects</h1>
      </header>

      <div className="proj-detail-page-content">
        <h2 className="proj-detail-title">{project.title}</h2>
        <p className="proj-detail-short">{project.shortDescription || project.title}</p>
        <div className="proj-detail-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="proj-detail-tag">{tag}</span>
          ))}
        </div>
        <p className="proj-detail-by">
          Project by <a href="#" className="proj-detail-author">{project.author}</a>
        </p>
        <hr className="blog-dotted-line" />

        <h3 className="proj-detail-heading">About the project</h3>
        <p className="proj-detail-text">{about}</p>

        <h3 className="proj-detail-heading">Project features &amp; highlights</h3>
        <p className="proj-detail-text">{features}</p>

        <h3 className="proj-detail-heading">Project links</h3>
        <div className="proj-detail-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-detail-link-icon" aria-label="GitHub">
            <GitHubIcon sx={{ fontSize: 24 }} />
          </a>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="proj-detail-link-icon" aria-label="Link">
            <LinkIcon sx={{ fontSize: 24 }} />
          </a>
          <a href={project.website} target="_blank" rel="noopener noreferrer" className="proj-detail-link-icon" aria-label="Website">
            <PublicIcon sx={{ fontSize: 24 }} />
          </a>
        </div>

        <h3 className="proj-detail-heading">Screenshots</h3>
        <div className="proj-detail-screenshots">
          {screenshots.slice(0, 2).map((src, i) => (
            <div key={i} className="proj-detail-screenshot">
              {src ? (
                <img src={src} alt={`Screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="proj-screenshot-placeholder" style={{ width: '100%', height: '100%' }} />
              )}
            </div>
          ))}
        </div>
        <p className="proj-detail-shared">Shared on {sharedOn}</p>
      </div>

      <div className="proj-upload-section">
        <h3 className="proj-upload-title">Upload new project</h3>
        <p className="proj-upload-desc">Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.</p>
        <Link href="/projects" className="proj-upload-btn proj-upload-btn-link">
          Upload a new project
        </Link>
      </div>
    </div>
  );
}
