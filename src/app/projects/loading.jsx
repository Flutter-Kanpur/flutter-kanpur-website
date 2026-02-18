import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import './projects.css';

function SkeletonCard() {
  return (
    <div className="proj-skeleton-card">
      <div className="proj-skeleton-block proj-skeleton-title" />
      <div className="proj-skeleton-row">
        <div className="proj-skeleton-block proj-skeleton-tag" />
        <div className="proj-skeleton-block proj-skeleton-tag" />
        <div className="proj-skeleton-block proj-skeleton-tag" />
      </div>
      <div className="proj-skeleton-block proj-skeleton-line" />
      <div className="proj-skeleton-block proj-skeleton-line" />
    </div>
  );
}

export default function ProjectsLoading() {
  return (
    <div className="proj-wrapper">
      <header className="proj-appbar">
        <Link href="/explore" className="proj-back" aria-label="Back to Explore">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </Link>
        <h1 className="proj-title">Projects</h1>
      </header>

      <div className="proj-search-wrap proj-search-wrap-skeleton">
        <SearchIcon sx={{ fontSize: 22 }} className="proj-search-icon" />
        <span className="proj-skeleton-inline" style={{ flex: 1, height: 20 }} />
        <div className="proj-search-divider" />
        <button type="button" className="proj-mic" aria-label="Voice search" disabled>
          <MicIcon sx={{ fontSize: 22 }} />
        </button>
      </div>

      <div className="proj-filters">
        <div className="proj-skeleton-chip" />
        <div className="proj-skeleton-chip" />
        <div className="proj-skeleton-chip" />
        <div className="proj-skeleton-chip" />
      </div>

      <div className="proj-list">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
