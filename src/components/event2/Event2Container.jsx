'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  IconButton,
  Chip,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BottomNav from '@/components/BottomNav/BottomNav';

/* 🔹 Reusable UI */
import SearchBar from '@/components/ui/SearchBar';
import FilterRow from '@/components/ui/FilterRow';
import EmptyState from '@/components/ui/EmptyState';

const FILTERS = ['DSA', 'Flutter', 'UI/UX'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;





/* ---------- Event Card ---------- */

function EventCard({ event, onToggleBookmark }) {
  const isLive = event.status === 'live';

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 'none',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {/* Top Row */}
      <Stack direction="row" justifyContent="space-between">
        <Typography
          fontSize={12}
          fontWeight={600}
          sx={{
            px: 1.2,
            py: 0.3,
            borderRadius: 2,
            background: isLive ? '#e0edff' : '#e7f7ef',
            color: isLive ? '#2563eb' : '#059669',
          }}
        >
          {isLive ? 'Live' : 'Upcoming'}
        </Typography>

        <IconButton onClick={() => onToggleBookmark(event.id)}>
          <BookmarkIcon
            sx={{
              color: event.bookmarked ? '#4F70F4' : '#9ca3af',
            }}
          />
        </IconButton>
      </Stack>

      {/* Title */}
      <Typography fontWeight={600} fontSize={16} mt={1}>
        {event.title}
      </Typography>

      {/* Date */}
      <Typography fontSize={13} color="#059669" mt={0.5}>
        {event.dateTimeLocation}
      </Typography>

      {/* Description */}
      <Typography fontSize={14} mt={1} color="#6b7280">
        {event.description}
      </Typography>

      {/* Buttons */}
      <Stack direction="column" spacing={1} mt={2}>
        <Button
          size="small"
          sx={{
            textTransform: 'none',
            color: '#2563eb',
            p: 0,
            minWidth: 'auto',
          }}
        >
          see more
        </Button>

        <Button
          size="small"
          variant="contained"
          sx={{
            borderRadius: 6,
            textTransform: 'none',
            background: '#000',
            px: 3,
            py: 0.6,
            '&:hover': { background: '#111' },
          }}
        >
          View Details
        </Button>
      </Stack>
    </Card>
  );
}





/* ---------- Main Page ---------- */

export default function Event2Container({ initialEvents = [] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

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



  /* ---------- Filtering ---------- */

  const filtered = useMemo(() => {
    return initialEvents.filter((e) => {
      const matchesSearch =
        !search ||
        e.title?.toLowerCase().includes(search.toLowerCase()) ||
        e.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || e.tag === filter;

      return matchesSearch && matchesFilter;
    });
  }, [initialEvents, search, filter]);

  const visibleEvents = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const isEmpty = filtered.length === 0;

  useEffect(() => setVisible(INITIAL_VISIBLE), [search, filter]);



  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const eventsWithBookmark = visibleEvents.map((e) => ({
    ...e,
    bookmarked: bookmarkedIds.includes(e.id),
  }));



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

        <Typography fontWeight={600}>Events</Typography>
      </Stack>



      <Box px={2}>
        {/* 🔍 Reusable Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          onMicClick={handleMic}
          isListening={isListening}
          placeholder="Search for events..."
        />

        {/* 🔽 Reusable Filter */}
        <FilterRow
          filters={FILTERS}
          active={filter}
          onChange={setFilter}
        />

        {/* 💤 Empty State */}
        {isEmpty ? (
          <EmptyState
            title="No events scheduled"
            subtitle="Check back later for upcoming events."
            buttonText="Browse learning resources"
          />
        ) : (
          <>
            <Stack spacing={1.5}>
              {eventsWithBookmark.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </Stack>

            {/* Load More */}
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
