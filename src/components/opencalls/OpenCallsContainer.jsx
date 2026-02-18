'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
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
  Menu,
  MenuItem,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import BottomNav from '@/components/BottomNav/BottomNav';

const FILTERS = ['All', 'Speakers', 'Volunteer'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

/* ---------- Card ---------- */

function OpenCallCard({ call, onToggleBookmark }) {
  const isClosingSoon = call.status === 'closes_soon';

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        boxShadow: 'none',
        border: '1px solid #e5e7eb',
      }}
    >
      {/* Top Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          fontSize={12}
          sx={{ color: isClosingSoon ? '#ef4444' : '#059669', fontWeight: 600 }}
        >
          {isClosingSoon ? 'Closes soon' : 'Open'}
        </Typography>

        <IconButton onClick={() => onToggleBookmark(call.id)}>
          {call.bookmarked ? (
            <BookmarkIcon sx={{ color: '#4F70F4' }} />
          ) : (
            <BookmarkBorderIcon sx={{ color: '#9ca3af' }} />
          )}
        </IconButton>
      </Stack>

      {/* Title */}
      <Typography fontWeight={600} fontSize={16} mt={0.5}>
        {call.title}
      </Typography>

      {/* Description */}
      <Typography fontSize={14} color="#6b7280" mt={0.5}>
        {call.description}
      </Typography>

      {/* Subtitle */}
      <Typography fontSize={13} color="#059669" mt={1}>
        {call.subtitle}
      </Typography>

      {/* Footer */}
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography fontSize={13} color="#6b7280">
          Apply by <strong>{call.applyBy}</strong>
        </Typography>

        <Link href={`/opencalls/${call.id}`} style={{ textDecoration: 'none' }}>
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
            View Details
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}

/* ---------- Main Page ---------- */

export default function OpenCallsContainer({ initialCalls = [] }) {
  const [calls] = useState(initialCalls);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

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

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const callsWithBookmark = visibleCalls.map((c) => ({
    ...c,
    bookmarked: bookmarkedIds.includes(c.id),
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
          'linear-gradient(180deg, #cfe0f7 0%, #eaf2ff 6%, #ffffff 12%)', // SAME AS CONTEST
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
        {/* Search — SAME */}
        <TextField
          placeholder="Search for calls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6b7280' }} />
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
            mb: 1.8,
            width: 360,
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              height: 52,
            },
          }}
        />

        {/* Filters — SAME */}
        <Stack direction="row" spacing={1} mb={2}>
          <Button
            variant="outlined"
            size="small"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              fontWeight: 600,
              borderColor: '#e5e7eb',
              color: '#222',
            }}
          >
            Filters
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {FILTERS.map((f) => (
              <MenuItem
                key={f}
                selected={filter === f}
                onClick={() => {
                  setFilter(f);
                  setAnchorEl(null);
                }}
              >
                {f}
              </MenuItem>
            ))}
          </Menu>

          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              clickable
              onClick={() => setFilter(f)}
              sx={{
                borderRadius: 1.5,
                fontWeight: 600,
                backgroundColor: filter === f ? '#4F70F4' : '#fff',
                color: filter === f ? '#fff' : '#222',
                border:
                  filter === f
                    ? '1px solid #4F70F4'
                    : '1px solid #e5e7eb',
              }}
            />
          ))}
        </Stack>

        {/* EMPTY — CENTERED */}
        {isEmpty ? (
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography fontWeight={600} fontSize={18}>
              No open calls right now
            </Typography>

            <Typography color="#6b7280" mt={1} maxWidth={260}>
              Opportunities will appear here when available.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 6,
                textTransform: 'none',
                background: '#000',
                px: 3,
                py: 0.6,
                '&:hover': { background: '#111' },
              }}
            >
              Join the community
            </Button>
          </Box>
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
                  sx={{
                    borderRadius: 6,
                    px: 3,
                    py: 0.7,
                    textTransform: 'none',
                    border: '1px solid #e5e7eb',
                    color: '#222',
                    background: '#fff',
                  }}
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
