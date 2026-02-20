'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  Card,
  IconButton,
  Button,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BottomNav from '@/components/BottomNav/BottomNav';

const PROJECT_FILTERS = ['Filters', 'Mobile app', 'Flutter', 'UX/UI'];
const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

/* -------------------- Project Card -------------------- */

function ProjectCard({ project, onToggleLike }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
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
      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
        {project.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              background: '#f3f4f6',
              fontWeight: 500,
            }}
          />
        ))}
      </Stack>

      {/* Meta */}
      <Typography fontSize={13} color="#6b7280" mt={1}>
        project by <strong>{project.author}</strong>
      </Typography>

      <Typography fontSize={13} color="#6b7280">
        posted on {project.postedOn}
      </Typography>

      {/* View Button */}
      <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 6,
            textTransform: 'none',
            background: '#000',
            '&:hover': { background: '#111' },
          }}
        >
          View project details
        </Button>
      </Link>

      {/* Icons */}
      <Stack direction="row" spacing={2} mt={2}>
        <IconButton>
          <GitHubIcon />
        </IconButton>
        <IconButton>
          <LinkIcon />
        </IconButton>
        <IconButton>
          <OpenInNewIcon />
        </IconButton>
        <IconButton>
          <EmailIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}

/* -------------------- Main Page -------------------- */

export default function ProjectsListPage({ initialProjects = [] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Filters');
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === 'Filters' ||
        p.tags?.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, activeFilter]);

  const visibleProjects = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const isEmpty = filtered.length === 0;

  const handleToggleLike = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked } : p
      )
    );
  };

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

        <Typography fontWeight={600} fontSize={18}>
          Projects
        </Typography>
      </Stack>

      <Box px={2}>
        {/* Search */}
        <TextField
          placeholder="Search for projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6b7280' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            width: '100%',
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              backgroundColor: '#fff',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              height: 52,
            },
          }}
        />

        {/* Filters */}
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          {PROJECT_FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              clickable
              onClick={() => setActiveFilter(f)}
              icon={f === 'Filters' ? <KeyboardArrowDownIcon /> : null}
              sx={{
                borderRadius: 1.5,
                fontWeight: 600,
                backgroundColor:
                  activeFilter === f ? '#4F70F4' : '#fff',
                color:
                  activeFilter === f ? '#fff' : '#222',
                border:
                  activeFilter === f
                    ? '1px solid #4F70F4'
                    : '1px solid #e5e7eb',
              }}
            />
          ))}
        </Stack>

        {/* Empty State */}
        {isEmpty && (
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
            <Typography color="#6b7280" mt={1}>
              Community projects will appear here.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 6,
                background: '#000',
                textTransform: 'none',
              }}
            >
              Upload your project
            </Button>
          </Box>
        )}

        {/* List */}
        {!isEmpty && (
          <>
            <Stack spacing={2}>
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </Stack>

            {hasMore && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  startIcon={<ExpandMoreIcon />}
                  onClick={() =>
                    setVisible((prev) => prev + LOAD_MORE_STEP)
                  }
                  sx={{
                    borderRadius: 6,
                    textTransform: 'none',
                    border: '1px solid #e5e7eb',
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
