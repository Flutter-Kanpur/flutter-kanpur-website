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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import BottomNav from '@/components/BottomNav/BottomNav';

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
      {/* Top Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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

      {/* Title */}
      <Typography fontWeight={600} fontSize={16} mt={0.5}>
        {contest.title}
      </Typography>

      {/* Tags */}
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

      {/* Footer */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);



  /* ---------- Filtering ---------- */

  const filtered = useMemo(() => {
    return initialContests.filter((c) => {
      const matchesSearch = !search
        ? true
        : c.title?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || c.tag === filter;
      return matchesSearch && matchesFilter;
    });
  }, [initialContests, search, filter]);

  const visibleContests = filtered.slice(0, visible);
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



  const handleToggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const contestsWithFavorite = visibleContests.map((c) => ({
    ...c,
    bookmarked: favoriteIds.includes(c.id),
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
          Contests
        </Typography>
      </Stack>



      <Box px={2}>

        {/* Search (same style as Blog/Event) */}
        <TextField
          placeholder="Search for contests..."
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



        {/* Filters */}
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



        {/* Empty State (same as Events) */}
        {isEmpty ? (
  <Box
    sx={{
      minHeight: '70vh',          // pushes content to vertical center
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',   // vertical center
      alignItems: 'center',
      textAlign: 'center',
      px: 2,
    }}
  >
    <Typography fontWeight={600} fontSize={18}>
      No contests available
    </Typography>

    <Typography
      sx={{
        color: '#6b7280',
        mt: 1,
        maxWidth: 260,
      }}
    >
      New contests will appear here once announced.
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
      Solve today's problem
    </Button>
  </Box>
) : (
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
