'use client';

import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav/BottomNav';

export default function ApplyPage() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('./success');
  };

  return (
    <Box sx={{ maxWidth: 393, mx: 'auto', pb: '110px' }}>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: 2, position: 'relative' }}>
        <Link href="../" style={{ position: 'absolute', left: 16 }}>
          <ArrowBackIcon />
        </Link>
        <Typography fontWeight={600}>Apply for Open Call</Typography>
      </Stack>

      <Box px={2}>
        <TextField fullWidth label="Full Name" sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" sx={{ mb: 2 }} />
        <TextField fullWidth label="Area of Expertise" sx={{ mb: 2 }} />
        <TextField fullWidth label="Contribution Description" multiline rows={3} sx={{ mb: 2 }} />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: 6,
            background: '#000',
            textTransform: 'none',
            py: 1.2,
          }}
        >
          Submit application →
        </Button>
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
