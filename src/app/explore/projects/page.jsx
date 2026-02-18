'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmailIcon from '@mui/icons-material/Email';
import '../explore.css';

const PROJECT_FILTERS = ['Filters', 'Mobile app', 'Flutter', 'UX/UI'];
const PROJECTS_LIST = [];

export default function ProjectsListPage() {
  const [activeFilter, setActiveFilter] = useState('Flutter');
  const [search, setSearch] = useState('');

  return (
    <div className="explore-layout min-h-screen flex flex-col bg-[#fafafa]">
      <header className="explore-header sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <Link href="/explore" className="p-1 -ml-1 rounded-full hover:bg-gray-100 text-gray-700" aria-label="Back">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 flex-1">Projects</h1>
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
            placeholder="Search for projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[#222222] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F70F4] focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {PROJECT_FILTERS.map((filter) => (
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
          {PROJECTS_LIST.map((project) => (
            <article key={project.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
        <button type="button" className="explore-heart rounded-full p-2 hover:bg-gray-100" aria-label="Like">
          <FavoriteBorderIcon sx={{ fontSize: 20 }} />
        </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{tag}</span>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">project by <span className="font-medium text-gray-700">{project.author}</span></p>
              <p className="text-xs text-gray-500">posted on <span className="text-gray-700">{project.postedOn}</span></p>
              <Link
                href="/explore"
                className="btn-project-details mt-3 block w-full px-4 py-2.5 text-center transition"
              >
                View project details
              </Link>
              <div className="mt-3 flex items-center gap-3 text-gray-500">
                <button type="button" aria-label="GitHub"><GitHubIcon sx={{ fontSize: 20 }} /></button>
                <button type="button" aria-label="Link"><LinkIcon sx={{ fontSize: 20 }} /></button>
                <button type="button" aria-label="Share"><OpenInNewIcon sx={{ fontSize: 20 }} /></button>
                <button type="button" aria-label="Email"><EmailIcon sx={{ fontSize: 20 }} /></button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button type="button" className="w-full py-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition">
            Load more
          </button>
          <button type="button" className="w-full py-3 rounded-xl explore-accent-bg font-semibold text-white hover:opacity-95 transition">
            Upload your project
          </button>
        </div>
      </main>
    </div>
  );
}
