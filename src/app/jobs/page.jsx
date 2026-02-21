'use client';

import { useState } from 'react';
import Link from 'next/link';
import '@/app/explore/explore.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const JOB_FILTERS = ['Filters', 'React', 'Flutter', 'UX/UI'];
const JOBS_LIST = [
  { id: 1, title: 'Lead Product Designer', company: 'Superkalan', location: 'Bangalore', tags: ['On-site', 'Full-time', 'Paid'] },
  { id: 2, title: 'Flutter Developer / UI/UX', company: 'Gulogik', location: 'Delhi', tags: ['Hybrid', 'Full-time', 'Un-paid'] },
  { id: 3, title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', tags: ['Remote', 'Full-time', 'Paid'] },
];

export default function JobsListPage() {
  const [activeFilter, setActiveFilter] = useState('React');
  const [search, setSearch] = useState('');

  return (
    <div className="explore-layout min-h-screen flex flex-col bg-[#fafafa]">
      <header className="explore-header sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <Link href="/explore" className="p-1 -ml-1 rounded-full hover:bg-gray-100 text-gray-700" aria-label="Back">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 flex-1">Suggested Jobs</h1>
        <button type="button" className="p-2 rounded-full hover:bg-gray-100" aria-label="Search">
          <SearchIcon sx={{ fontSize: 22 }} className="text-gray-600" />
        </button>
        <button type="button" className="p-2 rounded-full hover:bg-gray-100" aria-label="Filter">
          <FilterListIcon sx={{ fontSize: 22 }} className="text-gray-600" />
        </button>
      </header>

      <main className="flex-1 px-4 pb-6 pt-4">
        <div className="relative mb-4">
          <SearchIcon sx={{ fontSize: 20 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search for jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[#222222] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F70F4] focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {JOB_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`filter-chip flex items-center gap-1 shrink-0 ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
              {filter === 'Filters' && <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {JOBS_LIST.map((job) => (
            <article key={job.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 flex-1">{job.title}</h3>
                <span className="btn-saved flex items-center gap-1 px-3 py-1.5">
                  <BookmarkIcon sx={{ fontSize: 16 }} /> Saved
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{tag}</span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-600">{job.company.charAt(0)}</span>
                <span>{job.company} / {job.location}</span>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="mt-6 w-full py-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition">
          Load more
        </button>
      </main>
    </div>
  );
}
