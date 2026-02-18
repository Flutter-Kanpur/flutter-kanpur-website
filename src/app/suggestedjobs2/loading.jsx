import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import './suggestedjobs2.css';

export default function SuggestedJobs2Loading() {
  return (
    <div className="sj2-wrapper">
      <header className="sj2-appbar">
        <Link href="/explore" className="sj2-back" aria-label="Back to Explore">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </Link>
        <h1 className="sj2-title">Suggested Jobs</h1>
      </header>
      <div className="sj2-search-wrap sj2-search-wrap-skeleton">
        <SearchIcon sx={{ fontSize: 22 }} className="sj2-search-icon" />
        <span className="sj2-skeleton-inline" style={{ flex: 1, height: 20 }} />
        <div className="sj2-search-divider" />
        <button type="button" className="sj2-mic" aria-label="Voice search" disabled>
          <MicIcon sx={{ fontSize: 22 }} />
        </button>
      </div>
      <div className="sj2-filters">
        <div className="sj2-skeleton-chip" />
        <div className="sj2-skeleton-chip" />
        <div className="sj2-skeleton-chip" />
      </div>
      <div className="sj2-list">
        <div className="sj2-skeleton-card" />
        <div className="sj2-skeleton-card" />
      </div>
    </div>
  );
}
