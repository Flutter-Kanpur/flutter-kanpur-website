import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BottomNav from '@/components/BottomNav/BottomNav';
import { fetchJobById } from '@/services/fetch_data_from_firestore';
import { normalizeJob } from '@/lib/normalizeJob';
import { JOB_LIST } from '@/data/jobs';
import '../suggestedjobs2.css';

export default async function JobDetailPage({ params }) {
  const resolved = await params;
  const id = typeof resolved?.id === 'string' ? resolved.id : String(resolved?.id ?? '');
  if (!id) notFound();

  let raw = null;
  try {
    raw = await fetchJobById('suggested_jobs', id);
  } catch (e) {
    console.error('Job fetch error:', e);
  }
  if (!raw) {
    const fallback = JOB_LIST.find((j) => String(j.id) === id);
    if (!fallback) notFound();
    raw = fallback;
  }

  const job = normalizeJob(raw);

  return (
    <div className="sj2-wrapper sj2-detail-wrapper">
      <header className="sj2-appbar">
        <Link href="/suggestedjobs2" className="sj2-back" aria-label="Back to Suggested Jobs">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </Link>
        <h1 className="sj2-title">Job details</h1>
      </header>

      <main className="sj2-detail-content">
        <h2 className="sj2-detail-job-title">{job.title}</h2>
        {job.description && (
          <p className="sj2-detail-short">{job.description}</p>
        )}
        <div className="sj2-detail-company">
          <span className="sj2-logo">{job.company.charAt(0)}</span>
          <span className="sj2-detail-company-text">{job.company} | {job.location}</span>
        </div>
        <div className="sj2-tags sj2-detail-tags">
          {job.tags.map((tag) => (
            <span key={tag} className="sj2-tag">{tag}</span>
          ))}
        </div>

        <h3 className="sj2-detail-heading">Required Skills</h3>
        <div className="sj2-detail-skills">
          {(job.requiredSkills || []).map((skill) => (
            <span key={skill} className="sj2-detail-skill">{skill}</span>
          ))}
        </div>

        <h3 className="sj2-detail-heading">About the role</h3>
        <p className="sj2-detail-text">{job.aboutRole || 'No description available.'}</p>

        <h3 className="sj2-detail-heading">What you&apos;ll do</h3>
        <p className="sj2-detail-text">{job.whatYouDo || job.aboutRole || 'No description available.'}</p>

        <div className="sj2-detail-cards">
          <div className="sj2-detail-card">
            <span className="sj2-detail-card-label">Location</span>
            <span className="sj2-detail-card-value">{job.location || '—'}</span>
          </div>
          <div className="sj2-detail-card">
            <span className="sj2-detail-card-label">Job type</span>
            <span className="sj2-detail-card-value">{job.jobType || '—'}</span>
          </div>
          <div className="sj2-detail-card">
            <span className="sj2-detail-card-label">Duration</span>
            <span className="sj2-detail-card-value">{job.duration || '—'}</span>
          </div>
          <div className="sj2-detail-card">
            <span className="sj2-detail-card-label">Start date</span>
            <span className="sj2-detail-card-value">{job.startDate || '—'}</span>
          </div>
          <div className="sj2-detail-card">
            <span className="sj2-detail-card-label">Experience level</span>
            <span className="sj2-detail-card-value">{job.experienceLevel || '—'}</span>
          </div>
        </div>

        <div className="sj2-detail-actions">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sj2-detail-apply-btn"
          >
            Apply now
            <ArrowForwardIcon sx={{ fontSize: 20 }} />
          </a>
          <button type="button" className="sj2-detail-save-link">
            <BookmarkIcon sx={{ fontSize: 18 }} />
            Save job
          </button>
        </div>
      </main>

      <BottomNav activeTab="explore" />
    </div>
  );
}
