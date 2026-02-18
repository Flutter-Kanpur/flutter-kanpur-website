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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';

import BottomNav from '@/components/BottomNav/BottomNav';

const FILTERS = ['Mobile app', 'Flutter', 'UI/UX'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

/* ---------- Card ---------- */

function ProjectCard({ project, onToggleLike }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
        mb: 1.5,
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight={600}>{project.title}</Typography>

        <IconButton onClick={() => onToggleLike(project.id)}>
          {project.liked ? (
            <FavoriteIcon sx={{ color: '#ef4444' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#9ca3af' }} />
          )}
        </IconButton>
      </Stack>

      {/* Tags */}
      <Stack direction="row" spacing={1} mt={1}>
        {project.tags?.map((tag) => (
          <Chip key={tag} label={tag} size="small" />
        ))}
      </Stack>

      {/* Meta */}
      <Typography fontSize={13} color="#6b7280" mt={1}>
        <strong>Project by:</strong> {project.author}
      </Typography>

      <Typography fontSize={13} color="#6b7280">
        <strong>Posted on:</strong> {project.postedOn}
      </Typography>

      {/* Divider */}
      <Box sx={{ borderTop: '1px solid #e5e7eb', my: 1.5 }} />

      {/* Actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
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
            View project details
          </Button>
        </Link>

        <Stack direction="row" spacing={1}>
          {project.github && (
            <IconButton component="a" href={project.github} target="_blank">
              <GitHubIcon />
            </IconButton>
          )}
          {project.link && (
            <IconButton component="a" href={project.link} target="_blank">
              <LinkIcon />
            </IconButton>
          )}
          {project.website && (
            <IconButton component="a" href={project.website} target="_blank">
              <PublicIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}

/* ---------- Main Page ---------- */

export default function ProjectsPageContainer({ initialProjects = [] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

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

  /* ---------- Filter ---------- */

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.author?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = !filter || p.tags?.includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  const visibleList = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;
  const isEmpty = projects.length === 0;
  const noResults = filtered.length === 0 && !isEmpty;

  const handleToggleLike = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked } : p
      )
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

        <Typography fontWeight={600}>Projects</Typography>
      </Stack>

      <Box px={2}>
        {/* Search */}
        <TextField
          placeholder="Search for projects..."
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
          <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />}>
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
              No projects shared yet
            </Typography>

            <Typography color="#6b7280" mt={1} maxWidth={260}>
              Community projects will appear here once members start sharing their work.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 6,
                textTransform: 'none',
                background: '#000',
                px: 3,
              }}
            >
              Upload your project
            </Button>
          </Box>
        )}

        {/* List */}
        {!isEmpty && !noResults && (
          <>
            {visibleList.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleLike={handleToggleLike}
              />
            ))}

            {hasMore && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  startIcon={<ExpandMoreIcon />}
                  onClick={() => setVisible((v) => v + LOAD_MORE_STEP)}
                >
                  Load more
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Upload Section */}
        <Box textAlign="center" mt={4}>
          <Typography fontWeight={600}>Upload your project</Typography>
          <Typography color="#6b7280" mt={0.5}>
            Share your work with the community.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1.5,
              borderRadius: 6,
              textTransform: 'none',
              background: '#000',
            }}
          >
            Upload project
          </Button>
        </Box>
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
