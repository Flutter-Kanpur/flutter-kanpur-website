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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import BottomNav from '@/components/BottomNav/BottomNav';

/* ✅ Reusable Components */
import SearchBar from '@/components/ui/SearchBar';
import FilterRow from '@/components/ui/FilterRow';
import EmptyState from '@/components/ui/EmptyState';

const FILTERS = ['DSA', 'Flutter', 'UI/UX'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

/* ---------- Contest Card ---------- */

function ContestCard({ contest, onToggleFavorite }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        boxShadow: 'none',
        border: '1px solid #e5e7eb',
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize={12} color="#6b7280">
          {contest.challengeType}
        </Typography>

        <IconButton onClick={() => onToggleFavorite(contest.id)}>
          {contest.bookmarked ? (
            <FavoriteIcon sx={{ color: '#ef4444' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#9ca3af' }} />
          )}
        </IconButton>
      </Stack>

      <Typography fontWeight={600} fontSize={16} mt={0.5}>
        {contest.title}
      </Typography>

      <Stack direction="row" spacing={1} mt={1}>
        {(contest.tags || []).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              borderRadius: 2,
              background: '#eef2ff',
              fontWeight: 500,
            }}
          />
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography fontSize={13}>
          Ends in <span style={{ color: '#ef4444' }}>{contest.endsIn}</span>
        </Typography>

        <Button
          variant="contained"
          sx={{
            borderRadius: 6,
            textTransform: 'none',
            background: '#000',
            px: 2.5,
            py: 0.6,
            '&:hover': { background: '#111' },
          }}
        >
          Continue contest
        </Button>
      </Stack>
    </Card>
  );
}

/* ---------- Main Page ---------- */

export default function Contest2Container({ initialContests = [] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  /* ---------- Filtering ---------- */

  const filtered = useMemo(() => {
    return initialContests.filter((c) => {
      const matchesSearch =
        !search ||
        c.title?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        !filter || c.tags?.includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [initialContests, search, filter]);

  const visibleContests = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const isEmpty = filtered.length === 0;

  useEffect(() => {
    setVisible(INITIAL_VISIBLE);
  }, [search, filter]);

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

  const handleToggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const contestsWithFavorite = visibleContests.map((c) => ({
    ...c,
    bookmarked: favoriteIds.includes(c.id),
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

        <Typography fontWeight={600}>Contests</Typography>
      </Stack>

      <Box px={2}>
        {/* ✅ Reusable Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          onMicClick={handleMic}
          isListening={isListening}
          placeholder="Search for contests..."
        />

        {/* ✅ Reusable Filter */}
        <FilterRow
          filters={FILTERS}
          active={filter}
          onChange={setFilter}
        />

        {/* ✅ Reusable Empty */}
        {isEmpty && (
          <EmptyState
            title="No contests available"
            subtitle="New contests will appear here once announced."
          />
        )}

        {/* List */}
        {!isEmpty && (
          <>
            <Stack spacing={1.5}>
              {contestsWithFavorite.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onToggleFavorite={handleToggleFavorite}
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
