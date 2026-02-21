'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  Card,
  Chip,
  IconButton,
  Button,
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';

/* ---------- Project Card ---------- */

function ProjectCard({ project }) {
  const href = `/projects/${encodeURIComponent(project.id)}`;

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 4,
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          {project.title}
        </Typography>

        <IconButton size="small">
          <FavoriteBorderIcon sx={{ fontSize: 20, color: '#ef4444' }} />
        </IconButton>
      </Stack>

      {/* Tags */}
      <Stack direction="row" spacing={1} mt={1} mb={1.5}>
        {project.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              fontSize: 13,
              borderRadius: 2,
              background: '#f3f4f6',
              color: '#333',
            }}
          />
        ))}
      </Stack>

      {/* Meta Info */}
      <Stack direction="row" justifyContent="space-between" mb={1.5}>
        <Box>
          <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
            Project by
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
            {project.author}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
            Posted on
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
            {project.postedOn}
          </Typography>
        </Box>
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          borderTop: '1px dashed #d1d5db',
          mb: 1.5,
        }}
      />

      {/* Actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          component={Link}
          href={href}
          variant="contained"
          sx={{
            textTransform: 'none',
            borderRadius: 6,
            px: 3,
            py: 1,
            background: '#000',
            fontSize: 14,
            '&:hover': { background: '#111' },
          }}
        >
          View project details
        </Button>

        <Stack direction="row" spacing={1}>
          <IconButton
            component="a"
            href={project.github}
            target="_blank"
            size="small"
            sx={{ border: '1px solid #e5e7eb' }}
          >
            <GitHubIcon sx={{ fontSize: 26 }} />
          </IconButton>

          <IconButton
            component="a"
            href={project.link}
            target="_blank"
            size="small"
            sx={{ border: '1px solid #e5e7eb' }}
          >
            <LinkIcon sx={{ fontSize: 26 }} />
          </IconButton>

          <IconButton
            component="a"
            href={project.website}
            target="_blank"
            size="small"
            sx={{ border: '1px solid #e5e7eb' }}
          >
            <PublicIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}

/* ---------- Main Section ---------- */

export default function Projects({ initialProjects = [] }) {
  const previewList = initialProjects.slice(0, 2);

  return (
    <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.2}
      >
        <Typography variant="h7" sx={{ fontWeight: 500 }}>
          Community projects
        </Typography>

        <Typography
          component={Link}
          href="/projects"
          sx={{
            fontSize: 15,
            color: '#4F70F4',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          View all
        </Typography>
      </Stack>

      {/* Cards */}
      <Stack spacing={1.5}>
        {previewList.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Stack>
    </Box>
  );
}
