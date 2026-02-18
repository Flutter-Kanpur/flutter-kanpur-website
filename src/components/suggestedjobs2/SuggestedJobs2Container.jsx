'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Card,
  IconButton,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import BottomNav from '@/components/BottomNav/BottomNav';

const FILTERS = ['React', 'Flutter', 'UI/UX'];

function JobCard({ job, onToggleSaved }) {
  return (
    <Link href={`/suggestedjobs2/${job.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          p: 2,
          borderRadius: 4,
          border: '1px solid #e5e7eb',
          boxShadow: 'none',
          mb: 1.5,
        }}
      >
        {/* Title + Save */}
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
              <BookmarkBorderIcon sx={{ color: '#9ca3af' }} />
            )}
          </IconButton>
        </Stack>

        {/* Description */}
        {job.description && (
          <Typography fontSize={13} color="#6b7280" mt={0.5}>
            {job.description}
          </Typography>
        )}

        {/* Tags */}
        <Stack direction="row" spacing={1} mt={1}>
          {job.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ background: '#eef2ff' }}
            />
          ))}
        </Stack>

        {/* Company */}
        <Stack direction="row" spacing={1} alignItems="center" mt={1.5}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
            }}
          >
            {job.company?.charAt(0)}
          </Box>

          <Typography fontSize={13} color="#6b7280">
            {job.company} | {job.location}
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
}

export default function SuggestedJobs2Container({ initialJobs = [] }) {
  const [jobs] = useState(initialJobs);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [savedIds, setSavedIds] = useState(
    initialJobs.filter((j) => j.saved).map((j) => j.id)
  );

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  /* ---------- Voice Search ---------- */

  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.onresult = (e) => setSearch(e.results[0][0].transcript);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  };

  /* ---------- Filter ---------- */

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || job.skillTag === filter;

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);

  const jobsWithSaved = filtered.map((job) => ({
    ...job,
    saved: savedIds.includes(job.id),
  }));

  const isEmpty = jobs.length === 0;
  const noResults = filtered.length === 0 && !isEmpty;

  const handleToggleSaved = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------- UI ---------- */

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
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 2, position: 'relative' }}
      >
        <Link href="/explore" style={{ position: 'absolute', left: 16 }}>
          <ArrowBackIcon />
        </Link>

        <Typography fontWeight={600}>Suggested Jobs</Typography>
      </Stack>

      <Box px={2}>
        {/* Search */}
        <TextField
          placeholder="Search for jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon
                  onClick={handleMic}
                  sx={{
                    cursor: 'pointer',
                    color: isListening ? '#4F70F4' : '#6b7280',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              backgroundColor: '#fff',
              height: 52,
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            },
          }}
        />

        {/* Filters */}
        <Stack direction="row" spacing={1} mb={2}>
          <Button
            variant="outlined"
            size="small"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Filters
          </Button>

          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              clickable
              onClick={() => setFilter(f === filter ? '' : f)}
              sx={{
                backgroundColor: filter === f ? '#4F70F4' : '#fff',
                color: filter === f ? '#fff' : '#222',
                border: '1px solid #e5e7eb',
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        {/* Empty */}
        {(isEmpty || noResults) && (
          <Box
            sx={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography fontWeight={600}>
              No jobs available
            </Typography>

            <Typography color="#6b7280" mt={1}>
              New jobs will appear here when published.
            </Typography>
          </Box>
        )}

        {/* List */}
        {!isEmpty && !noResults && (
          <Box>
            {jobsWithSaved.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onToggleSaved={handleToggleSaved}
              />
            ))}
          </Box>
        )}
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
