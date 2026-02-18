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
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BlogDetailClient from '@/components/BlogDetail/BlogDetailClient';
import BottomNav from '@/components/BottomNav/BottomNav';

const FILTERS = ['DSA', 'Flutter', 'UI/UX'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

/* ---------- Blog Card ---------- */
function BlogCard({ blog }) {
  return (
     <Link
      href={`/blog/${blog.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
    <Card
      sx={{
        p: 1.8,
        borderRadius: 3,
        boxShadow: 'none',
        borderBottom: '2px solid #e5e7eb',
        background: 'transparent',
      }}
    >
      <Stack direction="row" spacing={1.5}>
        {/* LEFT */}
        <Box flex={1} minWidth={0} height={115}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 26, height: 26 }}>
              {blog.author?.charAt(0)}
            </Avatar>

            <Typography
              fontSize={14}
              fontWeight={500}
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}
            >
              {blog.author}
            </Typography>
          </Stack>

          <Typography
            mt={0.8}
            sx={{
              fontSize: 17,
              fontWeight: 550,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              pr: 1,
            }}
          >
            {blog.title}
          </Typography>

          {/* Likes + Comments */}
          <Stack direction="row" spacing={2} mt={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <FavoriteIcon sx={{ fontSize: 15, color: '#ef4444' }} />
              <Typography fontSize={13} color="#6b7280">
                {blog.likes}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <ChatBubbleOutlineIcon sx={{ fontSize: 15, color: '#6b7280' }} />
              <Typography fontSize={13} color="#6b7280">
                {blog.comments}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* RIGHT */}
        <Box sx={{ width: 112, flexShrink: 0 }}>
          <Box
            sx={{
              width: 112,
              height: 72,
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: '#f3f4f6',
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 12,
              color: '#6b7280',
              mt: 0.7,
              whiteSpace: 'nowrap',
              textAlign: 'right',
              fontWeight:405,
            }}
          >
            Posted on {blog.postedOn}
          </Typography>
        </Box>
      </Stack>
    </Card>
    </Link>
  );
}

/* ---------- Main Page ---------- */

export default function Blog2Container({ initialBlogs = [] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [isListening, setIsListening] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const recognitionRef = useRef(null);

  /* ---------- Filtering ---------- */

  const filtered = useMemo(() => {
    return initialBlogs.filter((b) => {
      const matchesSearch = !search
        ? true
        : b.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.author?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || b.tag === filter;
      return matchesSearch && matchesFilter;
    });
  }, [initialBlogs, search, filter]);

  const visibleBlogs = filtered.slice(0, visible);
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

  /* ---------- Layout ---------- */

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
          Blogs & Articles
        </Typography>
      </Stack>

      <Box px={2}>
        {/* Search */}
        <TextField
          placeholder="Search for titles..."
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

        {/* Empty States */}
        {isEmpty ? (
  <Box
    sx={{
      minHeight: '60vh',            // pushes content downward
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: 3,
      textAlign: 'center',
    }}
  >
    {/* Title */}
    <Typography fontWeight={600} fontSize={18}>
      {search ? 'No articles found' : 'No articles available'}
    </Typography>

    {/* Subtitle with proper padding like screenshot */}
    <Typography
      sx={{
        color: '#6b7280',
        mt: 1.2,
        px: 2.5, 
        fontWeight:330,
        maxWidth: 280,
        lineHeight: 1.2,
      }}
    >
      {search
        ? 'We couldn’t find any articles matching your search.'
        : 'New blogs will appear here when published.'}
    </Typography>
     <Box sx={{ flexGrow: 0.1}} />
    {/* Write card at bottom (above navbar) */}
    <BlogDetailClient />
  </Box>
) : (

          <>
            <Stack spacing={1.5}>
              {visibleBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
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
