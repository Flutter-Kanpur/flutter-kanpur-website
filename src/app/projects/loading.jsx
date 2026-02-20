'use client';

import Link from 'next/link';
import {
  Box,
  Stack,
  Typography,
  Skeleton,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

export default function ProjectsLoading() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #dbeafe 0%, #ffffff 15%, #ffffff 100%)',
        maxWidth: 428,
        mx: 'auto',
        pb: 8,
      }}
    >
      {/* ---------- Header ---------- */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2, position: 'relative', mb: 3 }}
      >
        <Link
          href="/explore"
          style={{
            position: 'absolute',
            left: 16,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowBackIcon />
        </Link>

        <Typography fontSize={20} fontWeight={700}>
          Projects
        </Typography>
      </Stack>

      {/* ---------- Search Skeleton ---------- */}
      <Box px={2}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#374151',
            borderRadius: 2,
            px: 2,
            py: 1.5,
            mb: 2,
          }}
        >
          <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />

          <Skeleton
            variant="text"
            width="60%"
            height={24}
            sx={{
              ml: 2,
              bgcolor: 'rgba(255,255,255,0.3)',
              borderRadius: 1,
            }}
          />

          <Box
            sx={{
              width: 1,
              height: 20,
              background: 'rgba(255,255,255,0.4)',
              mx: 2,
            }}
          />

          <MicIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
        </Box>

        {/* ---------- Filter Chips Skeleton ---------- */}
        <Stack direction="row" spacing={1} mb={3}>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              variant="rounded"
              width={80}
              height={36}
              sx={{ borderRadius: 5 }}
            />
          ))}
        </Stack>

        {/* ---------- Skeleton Cards ---------- */}
        <Stack spacing={2}>
          {[1, 2].map((item) => (
            <Box
              key={item}
              sx={{
                p: 2,
                borderRadius: 3,
                border: '1px solid #e5e7eb',
                background: '#fff',
              }}
            >
              <Skeleton
                variant="text"
                width="75%"
                height={28}
              />

              <Stack direction="row" spacing={1} mt={1}>
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={24}
                  sx={{ borderRadius: 5 }}
                />
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={24}
                  sx={{ borderRadius: 5 }}
                />
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={24}
                  sx={{ borderRadius: 5 }}
                />
              </Stack>

              <Skeleton
                variant="text"
                width="100%"
                height={18}
                sx={{ mt: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={18}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
