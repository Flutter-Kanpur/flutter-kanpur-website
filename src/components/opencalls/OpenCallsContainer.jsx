'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Box, Typography, Stack, Button } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BottomNav from '@/components/BottomNav/BottomNav';
import SearchBar from '@/components/ui/SearchBar';
import FilterRow from '@/components/ui/FilterRow';
import EmptyState from '@/components/ui/EmptyState';
import OpenCallCard from '@/components/opencalls/OpenCallCard';

const FILTERS = ['All', 'Speakers', 'Volunteer'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

export default function OpenCallsContainer({ initialCalls = [] }) {
  const [calls] = useState(initialCalls);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  /* ---------- Voice ---------- */

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

  /* ---------- Filtering ---------- */

  const filtered = useMemo(() => {
    return calls.filter((c) => {
      const matchesSearch =
        !search ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === 'All' || c.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [calls, search, filter]);

  const visibleCalls = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const isEmpty = filtered.length === 0;

  useEffect(() => setVisible(INITIAL_VISIBLE), [search, filter]);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const callsWithBookmark = visibleCalls.map((c) => ({
    ...c,
    bookmarked: bookmarkedIds.includes(c.id),
  }));

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
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2, position: 'relative' }}
      >
        <Link
          href="/explore"
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIcon />
        </Link>

        <Typography fontSize={18} fontWeight={600}>
          Open calls
        </Typography>
      </Stack>

      <Box px={2}>
        {/* Reusable Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          onMicClick={handleMic}
          isListening={isListening}
          placeholder="Search for calls..."
        />

        {/* Reusable Filter */}
        <FilterRow
          filters={FILTERS}
          active={filter}
          onChange={setFilter}
        />

        {/* Empty State */}
        {isEmpty ? (
          <EmptyState
            title="No open calls right now"
            subtitle="Opportunities will appear here when available."
            buttonText="Join the community"
          />
        ) : (
          <>
            <Stack spacing={1.5}>
              {callsWithBookmark.map((call) => (
                <OpenCallCard
                  key={call.id}
                  call={call}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </Stack>

            {hasMore && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  startIcon={<ExpandMoreIcon />}
                  onClick={() => setVisible((p) => p + LOAD_MORE_STEP)}
                >
                  Load more
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
