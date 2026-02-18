'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  Card,
  Chip,
  Avatar,
  Button,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function JobCard({ job }) {
  const href = `/suggestedjobs2/${encodeURIComponent(job.id)}`;

  return (
    <Card
      component={Link}
      href={href}
      sx={{
        p: 2,
        borderRadius: 3,
        textDecoration: 'none',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      {/* Title + Saved */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 600,
            color: '#111',
          }}
        >
          {job.title}
        </Typography>

        <Button
          size="small"
          startIcon={<BookmarkIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: 'none',
            bgcolor: '#4F70F4',
            color: '#fff',
            borderRadius: 2,
            px: 1.5,
            minHeight: 28,
            fontSize: 13,
            '&:hover': { bgcolor: '#3b5bd9' },
          }}
        >
          Saved
        </Button>
      </Stack>

      {/* Tags */}
      <Stack direction="row" spacing={1} mb={1.2} flexWrap="wrap">
        {job.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            sx={{
              borderRadius: 999,
              fontSize: 13,
              bgcolor: '#f3f4f6',
              color: '#333',
              border: '1px solid #e5e7eb',
            }}
          />
        ))}
      </Stack>

      {/* Company Row */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: '#0f172a',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {job.company?.charAt(0)}
        </Avatar>

        <Typography
          sx={{
            fontSize: 14,
            color: '#6b7280',
          }}
        >
          {job.company} | {job.location}
        </Typography>
      </Stack>
    </Card>
  );
}

export default function SuggestedJobs({ initialJobs = [] }) {
  const previewList = Array.isArray(initialJobs)
    ? initialJobs.slice(0, 2)
    : [];

  return (
    <Box sx={{ px: 2.5, pt: 1.5, pb: 2 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.2}
      >
        <Typography variant="h7" sx={{ fontWeight: 500 }}>
          Suggested jobs
        </Typography>

        <Typography
          component={Link}
          href="/suggestedjobs2"
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

      {/* Job List */}
      <Stack spacing={1.5}>
        {previewList.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Stack>
    </Box>
  );
}
