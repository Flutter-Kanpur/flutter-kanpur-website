'use client';

import Link from 'next/link';
import {
  Card,
  Stack,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function OpenCallCard({ call, onToggleBookmark }) {
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
      <Stack direction="row" justifyContent="space-between">
        <Typography
          fontSize={12}
          sx={{
            color: isClosingSoon ? '#ef4444' : '#059669',
            fontWeight: 600,
          }}
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

      <Typography fontWeight={600} fontSize={16} mt={0.5}>
        {call.title}
      </Typography>

      <Typography fontSize={14} color="#6b7280" mt={0.5}>
        {call.description}
      </Typography>

      <Typography fontSize={13} color="#059669" mt={1}>
        {call.subtitle}
      </Typography>

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
