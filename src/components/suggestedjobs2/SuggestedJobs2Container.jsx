'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  Card,
  IconButton,
  Chip,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import BottomNav from '@/components/BottomNav/BottomNav';
import SearchBar from '@/components/ui/SearchBar';
import FilterRow from '@/components/ui/FilterRow';
import EmptyState from '@/components/ui/EmptyState';

import { JOB_LIST } from '@/data/jobs';

const FILTERS = ['React', 'Flutter', 'UI/UX'];

function JobCard({ job, onToggleSaved }) {
  return (
    <Link href={`/suggestedjobs2/${job.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ p: 2, borderRadius: 3, mb: 1.5 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>{job.title}</Typography>

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              onToggleSaved(job.id);
            }}
          >
            {job.saved ? (
              <BookmarkIcon sx={{ color: '#4F70F4' }} />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={1} mt={1}>
          {job.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>

        <Typography fontSize={13} mt={1} color="#6b7280">
          {job.company} | {job.location}
        </Typography>
      </Card>
    </Link>
  );
}

export default function SuggestedJobs2Container({ initialJobs = [] }) {
  const jobsData =
    initialJobs && initialJobs.length > 0 ? initialJobs : JOB_LIST;

  const [jobs] = useState(jobsData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.onresult = (e) => setSearch(e.results[0][0].transcript);
    rec.start();
    setIsListening(true);
    rec.onend = () => setIsListening(false);
  };

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || job.skillTag === filter;

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);

  const handleToggleSaved = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const jobsWithSaved = filtered.map((j) => ({
    ...j,
    saved: savedIds.includes(j.id),
  }));

  const isEmpty = jobsWithSaved.length === 0;

  return (
    <Box
  sx={{
    width: '100%',
    maxWidth: 393,
    mx: 'auto',
    minHeight: '100vh',
    pb: '110px',
    background:
      'linear-gradient(180deg, #cfe0f7 0%, #eaf2ff 6%, #ffffff 12%)',
  }}
>
      <Stack direction="row" justifyContent="center" sx={{ p: 2, position: 'relative' }}>
        <Link href="/explore" style={{ position: 'absolute', left: 16 }}>
          <ArrowBackIcon />
        </Link>
        <Typography fontWeight={600}>Suggested Jobs</Typography>
      </Stack>

      <Box px={2}>
        <SearchBar
          value={search}
          onChange={setSearch}
          onMicClick={handleMic}
          isListening={isListening}
          placeholder="Search jobs..."
        />

        <FilterRow filters={FILTERS} active={filter} onChange={setFilter} />

        {isEmpty ? (
          <EmptyState
            title="No jobs available"
            subtitle="Try changing search or filters."
          />
        ) : (
          jobsWithSaved.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onToggleSaved={handleToggleSaved}
            />
          ))
        )}
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
