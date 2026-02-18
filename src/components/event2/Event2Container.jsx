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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import BottomNav from '@/components/BottomNav/BottomNav';

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Status Badge */}
        <Box
          sx={{
            px: 1.2,
            py: 0.3,
            borderRadius: 2,
            fontSize: 12,
            fontWeight: 600,
            background: isLive ? '#e0edff' : '#e7f7ef',
            color: isLive ? '#2563eb' : '#059669',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {isLive && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#2563eb',
              }}
            />
          )}
          {isLive ? 'Live' : 'Upcoming'}
        </Box>

        {/* Bookmark */}
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
      {/* Bottom Actions */}
       {/* Bottom Actions - Column like design */}
<Stack
  direction="column"
  alignItems="flex-start"
  spacing={1}
  mt={2}
>
  {/* See more (text style) */}
  <Button
    size="small"
    sx={{
      textTransform: 'none',
      fontWeight: 500,
      color: '#2563eb',
      p: 0,
      minWidth: 'auto',
    }}
  >
    see more
  </Button>

  {/* View Details (button below) */}
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
  const [anchorEl, setAnchorEl] = useState(null);
  const recognitionRef = useRef(null);



  /* ---------- Filtering ---------- */

  const filtered = useMemo(() => {
    return initialEvents.filter((e) => {
      const matchesSearch = !search
        ? true
        : e.title?.toLowerCase().includes(search.toLowerCase()) ||
          e.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || e.tag === filter;
      return matchesSearch && matchesFilter;
    });
  }, [initialEvents, search, filter]);

  const visibleEvents = filtered.slice(0, visible);
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
          Events
        </Typography>
      </Stack>



      <Box px={2}>

        {/* Search (Same as Blog) */}
        <TextField
          placeholder="Search for events..."
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



        {/* Filters (Same as Blog2) */}
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
              onClick={() => setFilter(f === filter ? '' : f)}
              sx={{
                borderRadius: 1.5,
                fontWeight: 600,
                backgroundColor: f === filter ? '#4F70F4' : '#fff',
                color: f === filter ? '#fff' : '#222',
                border:
                  f === filter
                    ? '1px solid #4F70F4'
                    : '1px solid #e5e7eb',
              }}
            />
          ))}
        </Stack>



        {/* Empty State */}
       {/* Empty State — PERFECT CENTER */}
{isEmpty ? (
  <Box
    sx={{
      minHeight: '60vh',            // pushes content to middle
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',     // vertical center
      alignItems: 'center',         // horizontal center
      textAlign: 'center',
      px: 3,
    }}
  >
    {/* Title */}
    <Typography fontWeight={600} fontSize={18}>
      No events scheduled
    </Typography>

    {/* Subtitle */}
    <Typography
      sx={{
        color: '#6b7280',
        mt: 1,
        maxWidth: 260,
        lineHeight: 1.5,
      }}
    >
      Check back later for upcoming events.
    </Typography>

    {/* Button */}
    <Button
      variant="contained"
      sx={{
        mt: 2.5,
        borderRadius: 6,
        textTransform: 'none',
        background: '#000',
        px: 3,
        py: 0.8,
        '&:hover': { background: '#111' },
      }}
    >
      Browse learning resources
    </Button>
  </Box>
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
