'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav/BottomNav';
import { fetchOpenCallsData } from '@/services/openCallsService';

export default function OpenCallDetailPage() {
  const { id } = useParams();
  const [call, setCall] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchOpenCallsData('open_calls');
      const selected = data.find((c) => c.id === id);
      setCall(selected);
    }
    load();
  }, [id]);

  if (!call) return null;

  return (
    <Box sx={{ maxWidth: 393, mx: 'auto', pb: '110px' }}>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: 2, position: 'relative' }}>
        <Link href="/opencalls" style={{ position: 'absolute', left: 16 }}>
          <ArrowBackIcon />
        </Link>
        <Typography fontWeight={600}>Open call</Typography>
      </Stack>

      <Box px={2}>
        <Typography fontSize={20} fontWeight={600}>
          {call.title}
        </Typography>

        <Typography mt={1} color="#6b7280">
          {call.description}
        </Typography>

        <Typography mt={2} fontWeight={600}>
          About this opportunity
        </Typography>

        <Typography mt={1} color="#6b7280">
          {call.about}
        </Typography>

        <Typography mt={2} fontWeight={600}>
          Application deadline
        </Typography>

        <Typography mt={1}>{call.applyBy}</Typography>

        <Link href={`/opencalls/${id}/apply`} style={{ textDecoration: 'none' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: 6,
              background: '#000',
              textTransform: 'none',
              py: 1.2,
            }}
          >
            Apply now →
          </Button>
        </Link>
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
